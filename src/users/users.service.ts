import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginDto, UpdateUserDto } from './dtos/users.dto';
import { User } from './entites/users.entiy';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
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
      await this.usersRepository.save(
        this.usersRepository.create({ ...createUserDto }),
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
      const user = await this.usersRepository.findOne({ email });
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

  async updateMe(
    userId: number,
    { email, password }: UpdateUserDto,
  ): Promise<User> {
    const user = await this.usersRepository.findOne(userId);
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    return this.usersRepository.save(user);
    //이렇게 update를 써서 변경하면 entity가 있는지 확인하지 않음
    // 그래서 실제로는 어떤 entity도 update하고 있지 않고 그냥 쿼리만 보내는거
    // BeforeUpdate 안됨
  }

  async getAllUsers() {
    return this.usersRepository.find();
  }
}
