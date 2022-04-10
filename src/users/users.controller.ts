import { Body, Controller, Get, Post, Req, Request } from '@nestjs/common';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { CreateUserDto, LoginDto, LoginOutput } from './dtos/users.dto';
import { User } from './entites/users.entiy';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('me')
  me(@Request() req: Request) {
    console.log('request user!! : ', req['user']);
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
