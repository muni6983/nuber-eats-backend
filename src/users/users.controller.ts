import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<{
    ok: boolean;
    error: string;
  }> {
    try {
      const { ok, error } = await this.usersService.createUser(createUserDto);
      return { ok, error };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
