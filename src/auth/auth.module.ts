import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from 'src/jwt/jwt.module';
import { UsersModule } from 'src/users/users.module';
import { AuthGurard } from './auth.guard';

@Module({
  imports: [UsersModule, JwtModule],
  providers: [
    {
      provide: APP_GUARD,
      //APP_GUARD를 사용해서 nest는 모든 controller를 실행하기 전에 authGuard를 실행함
      //그래서 metadata를 설정한다는 것은 authentication을 고려한다는 의미
      //meatadata없으면 user의 로그인에 상관 없음 public임
      useClass: AuthGurard,
    },
  ],
})
export class AuthModule {}
