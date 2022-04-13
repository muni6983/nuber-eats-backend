import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { JwtMiddleware } from 'src/jwt/jwt.middleware';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, RestaurantsModule, AuthModule],
})
export class ControllerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
