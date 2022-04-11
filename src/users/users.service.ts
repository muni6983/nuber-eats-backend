import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginDto, UpdateUserDto } from './dtos/users.dto';
import { User } from './entites/users.entiy';
import { JwtService } from 'src/jwt/jwt.service';
import { Verification } from './entites/verification.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ ok: boolean; error?: string }> {
    try {
      const exist = await this.usersRepository.findOne(createUserDto.email);
      if (exist) {
        return { ok: false, error: 'There is a user with that email already' };
      }
      const user = await this.usersRepository.save(
        this.usersRepository.create({ ...createUserDto }),
      );
      await this.verificationRepository.save(
        this.verificationRepository.create({ user }),
      );
      return { ok: true };
    } catch (e) {
      return { ok: false, error: "Couldn't create account" };
    }
  }

  async login({
    email,
    password,
  }: LoginDto): Promise<{ ok: boolean; error?: string; token?: string }> {
    try {
      const user = await this.usersRepository.findOne(
        { email },
        { select: ['password', 'id'] },
      );
      if (!user) {
        return { ok: false, error: 'User not found' };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return { ok: false, error: 'Wrong password' };
      }
      const token = this.jwtService.sign(user.id);
      return { ok: true, token };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findOne({ id });
  }

  async updateMe(userId: number, { email, password }: UpdateUserDto) {
    try {
      const user = await this.usersRepository.findOne(userId);
      if (email) {
        user.email = email;
        user.verified = false;
        await this.verificationRepository.save(
          this.verificationRepository.create({ user }),
        );
      }
      if (password) {
        user.password = password;
      }
      this.usersRepository.save(user);
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
    //이렇게 update를 써서 변경하면 entity가 있는지 확인하지 않음
    // 그래서 실제로는 어떤 entity도 update하고 있지 않고 그냥 쿼리만 보내는거
    // BeforeUpdate 안됨
  }

  async getAllUsers() {
    return this.usersRepository.find();
  }

  async verifyEmail(code: string) {
    try {
      const verification = await this.verificationRepository.findOne(
        { code },
        {
          relations: ['user'],
        },
      );
      if (verification) {
        verification.user.verified = true;
        this.usersRepository.save(verification.user);
        return { ok: true };
      }
      return { ok: false, error: 'Verification not found' };
    } catch (error) {
      console.log('error ! : ', error);
      return { ok: false, error };
    }
  }
}
