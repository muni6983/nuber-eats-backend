import { Controller, Get, Post } from '@nestjs/common';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';

@Controller('a')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  getAll() {
    return this.restaurantsService.getAll();
  }

  @Post()
  createRestaurant(createRestaurantDto: CreateRestaurantDto) {
    this.restaurantsService.createRestaurant(createRestaurantDto);
  }
}
