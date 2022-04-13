import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';
import {
  CategoryController,
  RestaurantsController,
} from './restaurants.controller';
import { CategoryRepository } from './repositories/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, CategoryRepository])],
  providers: [RestaurantsService],
  controllers: [RestaurantsController, CategoryController],
  exports: [RestaurantsService],
})
export class RestaurantsModule {}
