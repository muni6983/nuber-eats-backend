import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';

import { User } from 'src/users/entites/users.entiy';
import {
  CreateRestaurantDto,
  CreateRestaurantOutput,
  EditRestaurantDto,
  EditRestaurantOutput,
} from './dtos/restaurant.dto';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurant')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  getAll() {
    return this.restaurantsService.getAll();
  }

  @Get('me')
  @Role(['Any'])
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  @Get('/:id')
  getRestaurantById(@Param('id') id: number) {
    return this.restaurantsService.getRestaurantById(id);
  }

  @Post()
  @Role(['Any'])
  createRestaurant(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @AuthUser() authUser: User,
  ): Promise<CreateRestaurantOutput> {
    return this.restaurantsService.createRestaurant(
      authUser,
      createRestaurantDto,
    );
  }

  @Patch('/:id')
  @Role(['OWNER'])
  editRestaurant(
    @AuthUser() owner: User,
    @Param('id') restaurantId: string,
    @Body() editRestaurantDto: EditRestaurantDto,
  ): Promise<EditRestaurantOutput> {
    return this.restaurantsService.editRestaurant(
      owner,
      editRestaurantDto,
      +restaurantId,
    );
  }
}
