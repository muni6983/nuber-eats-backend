import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';

import { User } from 'src/users/entites/users.entiy';
import {
  CreateRestaurantDto,
  CreateRestaurantOutput,
} from './dtos/restaurant.dto';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurant')
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
  @Role(['OWNER'])
  createRestaurant(
    @AuthUser() authUser: User,
    @Body() createRestaurantDto: CreateRestaurantDto,
  ): Promise<CreateRestaurantOutput> {
    return this.restaurantsService.createRestaurant(
      authUser,
      createRestaurantDto,
    );
  }

  // @Patch('/:id')
  // updateRestaurant(
  //   @Param('id') id: number,
  //   @Body() updateRestaurantDto: UpdateRestaurantDto,
  // ) {
  //   this.restaurantsService.updateRestaurant(id, updateRestaurantDto);
  // }
}
