import { Controller, Get, Post } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';

@Controller('')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  getAll() {
    return this.restaurantsService.getAll();
  }

  @Post()
  createRestaurant() {
    this.restaurantsService.createRestaurant({
      name: 'muni',
      isVegan: true,
      address: 'gangnam',
      ownerName: 'min',
      categoryName: 'bulla bulla',
    });
  }
}
