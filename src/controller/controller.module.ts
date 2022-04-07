import { Module } from '@nestjs/common';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, RestaurantsModule],
})
export class ControllerModule {}
