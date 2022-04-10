import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtMiddleware } from 'src/jwt/jwt.middleware';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, RestaurantsModule],
})
export class ControllerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('users');
  }
}
