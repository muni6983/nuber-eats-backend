import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { PaginationOutput } from 'src/common/dtos/pagination.dto';
import { Column } from 'typeorm';
import { User } from '../entites/users.entiy';

export class CreateUserDto extends OmitType(User, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

export class CreateUserOutput extends MutationOutput {
  user?: User;
}

export class LoginDto extends PickType(User, ['email', 'password']) {}
export class LoginOutput extends MutationOutput {
  @IsString()
  @Column('string', { nullable: true })
  token?: string;
}

// export class UserProfileDto {
//   @IsNumber()
//   @Column()
//   id: number;
// }

export class UpdateUserDto extends PartialType(
  PickType(User, ['email', 'password']),
) {}

export class UserOutput extends PaginationOutput {
  @Column({ nullable: true })
  @IsArray()
  users?: User[];
}
