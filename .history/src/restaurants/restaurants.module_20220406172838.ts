import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsService } from './restaurants.service';
// import { RestaurantResolver } from './restaurants.resolver';

@Module({
  // imports: [TypeOrmModule.forFeature([User])],
  providers: [RestaurantsService],
  // exports: [UserService],
})
export class RestaurantsModule {}
