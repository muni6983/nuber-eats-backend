import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGurard } from 'src/auth/auth.guard';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { CreateUserDto, LoginDto, LoginOutput } from './dtos/users.dto';
import { User } from './entites/users.entiy';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(AuthGurard)
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  // @Header('Custom', 'Test Header')
  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<LoginOutput> {
    try {
      return this.usersService.login(loginDto);
    } catch (error) {
      return { ok: false, error };
    }
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<MutationOutput> {
    try {
      return this.usersService.createUser(createUserDto);
    } catch (error) {
      return { ok: false, error };
    }
  }
}
