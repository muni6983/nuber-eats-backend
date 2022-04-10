import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGurard } from 'src/auth/auth.guard';
import { MutationOutput } from 'src/common/dtos/output.dto';
import {
  CreateUserDto,
  LoginDto,
  LoginOutput,
  UpdateUserDto,
} from './dtos/users.dto';
import { User } from './entites/users.entiy';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('me')
  @UseGuards(AuthGurard)
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  @Get(':id')
  // @UseGuards(AuthGurard)
  userProfileById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @Patch()
  @UseGuards(AuthGurard)
  async updateMe(
    @Body() updateUserDto: UpdateUserDto,
    @AuthUser() authUser: User,
  ): Promise<MutationOutput> {
    try {
      await this.usersService.updateMe(authUser.id, updateUserDto);
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
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
