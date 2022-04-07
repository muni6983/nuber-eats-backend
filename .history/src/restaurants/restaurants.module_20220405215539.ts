import { Module } from '@nestjs/common';

@Module({
  providers: [RestaurantResolver],
})
export class RestaurantsModule {}
