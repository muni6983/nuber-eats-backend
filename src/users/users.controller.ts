import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
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
import { VerifyEmailDto, VerifyEmailOutputDto } from './dtos/verify-email.dto';
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
