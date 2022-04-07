import { OmitType, PickType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { Column } from 'typeorm';
import { User } from '../entites/users.entiy';

export class CreateUserDto extends OmitType(User, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

export class LoginDto extends PickType(User, ['email', 'password']) {}
export class LoginOutput extends MutationOutput {
  @IsString()
  @Column('string', { nullable: true })
  token?: string;
}
