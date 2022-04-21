import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from 'src/jwt/jwt.service';
import { UsersService } from 'src/users/users.service';
import { AllowedRoles } from './role.decorator';

@Injectable()
export class AuthGurard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
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

    const request = context.switchToHttp().getRequest();
    const token = request.headers['x-jwt'];
    if (token) {
      const decoded = this.jwtService.verify(token.toString());
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        const user = await this.usersService.findById(decoded['id']);
        if (!user) {
          return false;
        }
        //guard 가 AuthUser decorator보다 먼저 실행되니까 여기서 request에 user넣어줌
        request['user'] = user;
        if (roles.includes('Any')) {
          return true;
        }
        return roles.includes(user.role);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

//AuthGurard가 true를 리턴 => request는 진행 허용 , false면 진행 못함
//Controller에 있는 api들
