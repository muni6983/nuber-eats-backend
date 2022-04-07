import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/users.dto';
import { User } from './entites/users.entiy';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
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
}
