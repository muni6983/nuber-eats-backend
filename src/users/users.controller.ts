import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { MutationOutput } from 'src/common/dtos/output.dto';
import {
  CreateUserDto,
  LoginDto,
  LoginOutput,
  UpdateUserDto,
  UserOutput,
} from './dtos/users.dto';
import { VerifyEmailDto, VerifyEmailOutputDto } from './dtos/verify-email.dto';
import { User } from './entites/users.entiy';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAllUsers(@Query('page') page: number): Promise<UserOutput> {
    return this.usersService.getAllUsers(page);
  }

  @Get('me')
  @Role(['Any'])
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  @Get(':id')
  userProfileById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @Patch()
  @Role(['Any'])
  updateMe(
    @Body() updateUserDto: UpdateUserDto,
    @AuthUser() authUser: User,
  ): Promise<MutationOutput> {
    return this.usersService.updateMe(authUser.id, updateUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<LoginOutput> {
    return this.usersService.login(loginDto);
  }

  @Post('/email-verify')
  verifyEmail(
    @Body() verifyEmailDto: VerifyEmailDto,
  ): Promise<VerifyEmailOutputDto> {
    return this.usersService.verifyEmail(verifyEmailDto.code);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<MutationOutput> {
    return this.usersService.createUser(createUserDto);
  }
}
