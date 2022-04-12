import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/users/entites/users.entiy';
import { AllowedRoles } from './role.decorator';

@Injectable()
export class AuthGurard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    //reflector는 metadata를 get하는 녀석임
    const roles = this.reflector.get<AllowedRoles>(
      //이 'roles'는 Setmetadata에 넣어준거랑 같아야함
      'roles',
      context.getHandler(),
    );

    if (!roles) {
      //metadata가 없으니 public
      return true;
    }

    const user: User = context.switchToHttp().getRequest().user;
    if (!user) {
      return false;
    }
    if (roles.includes('Any')) {
      return true;
    }

    return roles.includes(user.role);
  }
}

//AuthGurard가 true를 리턴 => request는 진행 허용 , false면 진행 못함
//Controller에 있는 api들
