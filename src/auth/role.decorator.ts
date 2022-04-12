import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/entites/users.entiy';

export type AllowedRoles = keyof typeof UserRole | 'Any';

export const Role = (roles: AllowedRoles[]) => SetMetadata('roles', roles);
