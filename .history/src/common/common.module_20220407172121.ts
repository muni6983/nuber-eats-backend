import { Module } from '@nestjs/common';

@Module({
  imports: [UsersModule, RestaurantsModule],
  controllers: [UsersController, RestaurantsController],
})
export class CommonModule {}
