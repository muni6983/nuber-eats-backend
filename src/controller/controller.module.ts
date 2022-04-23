import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';
import { JwtMiddleware } from 'src/jwt/jwt.middleware';
import { OrdersModule } from 'src/orders/orders.module';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    RestaurantsModule,
    AuthModule,
    OrdersModule,
    CommonModule,
  ],
})
export class ControllerModule {}
// implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(JwtMiddleware).forRoutes('*');
//   }
// }
