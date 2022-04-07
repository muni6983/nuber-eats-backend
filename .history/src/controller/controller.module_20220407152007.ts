import { Module } from '@nestjs/common';
import { RestaurantsController } from 'src/restaurants/restaurants.controller';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';

@Module({
  imports: [RestaurantsModule],
  controllers: [RestaurantsController],
})
export class ControllerModule {}
