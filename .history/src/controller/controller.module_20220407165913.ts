import { Module } from '@nestjs/common';
import { RestaurantsController } from 'src/restaurants/restaurants.controller';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { UsersController } from 'src/users/users.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [UsersController],
})
export class ControllerModule {}
