import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entites/users.entiy';
import { AllCategoriesOutput } from './dtos/category.dto';
import {
  CreateRestaurantDto,
  CreateRestaurantOutput,
  DeleteRestaurantOutput,
  EditRestaurantDto,
  EditRestaurantOutput,
} from './dtos/restaurant.dto';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  getAllRestaurants() {
    return this.restaurantsService.getAllRestaurants();
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

  @Delete('/:id')
  @Role(['OWNER'])
  deleteRestaurant(
    @AuthUser() owner: User,
    @Param('id') restaurantId: string,
  ): Promise<DeleteRestaurantOutput> {
    return this.restaurantsService.deleteRestaurant(owner, +restaurantId);
  }
}

@Controller('categories')
export class CategoryController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  getAllCategories(): Promise<AllCategoriesOutput> {
    return this.restaurantsService.getAllCategories();
  }
}
