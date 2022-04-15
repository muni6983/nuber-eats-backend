import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';
import {
  CategoryController,
  DishController,
  RestaurantsController,
} from './restaurants.controller';
import { CategoryRepository } from './repositories/category.repository';
import { Dish } from './entities/dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, CategoryRepository, Dish])],
  providers: [RestaurantsService],
  controllers: [RestaurantsController, CategoryController, DishController],
  exports: [RestaurantsService],
})
export class RestaurantsModule {}
