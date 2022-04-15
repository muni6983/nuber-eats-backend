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
import { AllCategoriesOutput, CategoryOutput } from './dtos/category.dto';
import {
  CreateDishDto,
  CreateDishOutput,
  DeleteDishOutput,
  EditDishDto,
  EditDishOuput,
} from './dtos/dish.dto';
import {
  CreateRestaurantDto,
  CreateRestaurantOutput,
  DeleteRestaurantOutput,
  EditRestaurantDto,
  EditRestaurantOutput,
  FindRestaurantOutput,
  RestaurantOuput,
  SearchRestaurantOutput,
} from './dtos/restaurant.dto';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  getAllRestaurants(@Query('page') page: number): Promise<RestaurantOuput> {
    return this.restaurantsService.getAllRestaurants(page);
  }

  @Get('me')
  @Role(['Any'])
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  @Get('search')
  searchRestaurantByName(
    @Query('query') query: string,
    @Query('page') page: number,
  ): Promise<SearchRestaurantOutput> {
    return this.restaurantsService.searchRestaurantByName(query, page);
  }

  @Get('/:id')
  getRestaurantById(@Param('id') id: string): Promise<FindRestaurantOutput> {
    return this.restaurantsService.getRestaurantById(+id);
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
  getAllCategories(@Query('page') page: number): Promise<AllCategoriesOutput> {
    return this.restaurantsService.getAllCategories(page);
  }

  @Get('/slug')
  findCategoryBySlug(
    @Query('slug') slugName: string,
    @Query('page') page: number,
  ): Promise<CategoryOutput> {
    return this.restaurantsService.findCategoryBySlug(slugName, page);
  }
}

@Controller('dishes')
export class DishController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @Role(['OWNER'])
  createDish(
    @AuthUser() owner: User,
    @Body() createDishDto: CreateDishDto,
  ): Promise<CreateDishOutput> {
    return this.restaurantsService.createDish(owner, createDishDto);
  }

  @Delete('/:id')
  @Role(['OWNER'])
  deleteDish(
    @AuthUser() owner: User,
    @Param('id') dishId: string,
  ): Promise<DeleteDishOutput> {
    return this.restaurantsService.deleteDish(owner, +dishId);
  }
}
