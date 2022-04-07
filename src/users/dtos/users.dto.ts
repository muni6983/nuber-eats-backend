import { OmitType } from '@nestjs/mapped-types';
import { User } from '../entites/users.entiy';

export class CreateUserDto extends OmitType(User, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
