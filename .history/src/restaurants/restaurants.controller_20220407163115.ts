import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';

@Controller('a')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  getAll() {
    return this.restaurantsService.getAll();
  }

  @Get('/:id')
  getRestaurantById(@Param('id') id: number) {
    return this.restaurantsService.getRestaurantById(id);
  }

  @Post()
  createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto) {
    this.restaurantsService.createRestaurant(createRestaurantDto);
  }

  @Patch(':id')
  updateRestaurant(
    @Param('id') id: number,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    this.restaurantsService.updateRestaurant(updateRestaurantDto);
  }
}
