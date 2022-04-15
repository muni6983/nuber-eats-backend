import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entites/users.entiy';
import { ILike, Repository } from 'typeorm';
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
  SearchRestaurantOutput,
} from './dtos/restaurant.dto';
import { Category } from './entities/category.entity';
import { Dish } from './entities/dish.entity';
import { Restaurant } from './entities/restaurant.entity';
import { CategoryRepository } from './repositories/category.repository';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantsRepository: Repository<Restaurant>,
    @InjectRepository(Dish)
    private readonly dishRepository: Repository<Dish>,

    private readonly categoryRepository: CategoryRepository,
  ) {}

  async getAllRestaurants(page: number) {
    try {
      const [restaurants, totalResults] =
        await this.restaurantsRepository.findAndCount({
          take: 25,
          skip: (page - 1) * 25,
        });
      return {
        ok: true,
        totalPages: Math.ceil(totalResults / 25),
        totalResults,
        results: restaurants,
      };
    } catch (error) {
      return { ok: false, error: "Couldn't load restaurants" };
    }
  }

  async getRestaurantById(id: number): Promise<FindRestaurantOutput> {
    try {
      const restaurant = await this.restaurantsRepository.findOne(
        { id },
        { relations: ['owner', 'menu'] },
      );
      if (!restaurant) {
        return { ok: false, error: 'Restaurant not found' };
      }
      return { ok: true, restaurant };
    } catch (error) {
      return { ok: false, error: "Couldn't find restaurant" };
    }
  }

  async searchRestaurantByName(
    query: string,
    page: number,
  ): Promise<SearchRestaurantOutput> {
    try {
      const [restaurants, totalResults] =
        await this.restaurantsRepository.findAndCount({
          where: {
            name: ILike(`%${query}%`),
          },
          take: 25,
          skip: (page - 1) * 25,
        });

      return {
        ok: true,
        totalPages: Math.ceil(totalResults / 25),
        totalResults,
        restaurants,
      };
    } catch (error) {
      return { ok: false, error: "Couldn't search for restaurants" };
    }
  }

  async createRestaurant(
    owner: User,
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<CreateRestaurantOutput> {
    try {
      const newRestaurant =
        this.restaurantsRepository.create(createRestaurantDto);
      newRestaurant.owner = owner;
      const category = await this.categoryRepository.getOrCreate(
        createRestaurantDto.categoryName,
      );
      newRestaurant.category = category;
      await this.restaurantsRepository.save(newRestaurant);
      return { ok: true, restaurant: newRestaurant };
    } catch (error) {
      return { ok: false, error: "Couldn't create Restaurant'" };
    }
  }

  async editRestaurant(
    owner: User,
    editRestaurantDto: EditRestaurantDto,
    restaurantId: number,
  ): Promise<EditRestaurantOutput> {
    try {
      const restaurant = await this.restaurantsRepository.findOne(restaurantId);
      if (!restaurant) {
        return { ok: false, error: 'Restaurant not found' };
      }
      if (owner.id !== restaurant.ownerId) {
        return {
          ok: false,
          error: "You can't edit a restaurant that you don't own",
        };
      }
      let category: Category = null;
      if (editRestaurantDto.categoryName) {
        category = await this.categoryRepository.getOrCreate(
          editRestaurantDto.categoryName,
        );
      }
      await this.restaurantsRepository.save({
        id: restaurantId,
        ...editRestaurantDto,
        ...(category && { category }),
      });
    } catch (error) {
      return { ok: false, error: "Coudn't edit Restaurant" };
    }
    return { ok: true };
  }
  async deleteRestaurant(
    owner: User,
    restaurantId: number,
  ): Promise<DeleteRestaurantOutput> {
    try {
      const restaurant = await this.restaurantsRepository.findOne(restaurantId);
      if (!restaurant) {
        return { ok: false, error: 'Restaurant not found' };
      }
      if (owner.id !== restaurant.ownerId) {
        return {
          ok: false,
          error: "You can't delete a restaurant that you don't own",
        };
      }
      await this.restaurantsRepository.delete(restaurantId);
    } catch (error) {
      return { ok: false, error: "Couldn't delete the Restaurant'" };
    }
    return { ok: true };
  }

  async getAllCategories(page: number): Promise<AllCategoriesOutput> {
    try {
      const [categories, totalResults] =
        await this.categoryRepository.findAndCount({
          take: 25,
          skip: (page - 1) * 25,
        });
      return {
        ok: true,
        totalPages: Math.ceil(totalResults / 25),
        totalResults,
        categories,
      };
    } catch (error) {
      return { ok: false, error: "Couldn't load categories" };
    }
  }

  async findCategoryBySlug(
    slugName: string,
    page: number,
  ): Promise<CategoryOutput> {
    try {
      const category = await this.categoryRepository.findOne(
        {
          slug: slugName,
        },
        { relations: ['restaurants'] },
      );
      if (!category) {
        return { ok: false, error: 'Category not found' };
      }
      const restaurants = await this.restaurantsRepository.find({
        where: { category },
        take: 25,
        skip: (page - 1) * 25,
      });
      category.restaurants = restaurants;
      return { ok: true, category };
    } catch (error) {
      return { ok: false, error: "Couldn't load category'" };
    }
    // return 에 totalPages 추가해줘야하는데
    //해당 카테고리를 가진 restaurant 개수를 어떻게 받아와야할지 모르겠음
  }

  async createDish(
    owner: User,
    createDishDto: CreateDishDto,
  ): Promise<CreateDishOutput> {
    try {
      const restaurant = await this.restaurantsRepository.findOne(
        createDishDto.restaurantId,
      );
      if (!restaurant) {
        return { ok: false, error: 'Restaurant not found' };
      }
      if (owner.id !== restaurant.ownerId) {
        return { ok: false, error: "You can't create Dish" };
      }
      const dish = await this.dishRepository.save(
        this.dishRepository.create({ ...createDishDto, restaurant }),
      );
      return { ok: true, dish };
    } catch (error) {
      return { ok: false, error: "Couldn't create dish" };
    }
  }

  async editDish(
    owner: User,
    editDishDto: EditDishDto,
    dishId: number,
  ): Promise<EditDishOuput> {
    try {
      const dish = await this.dishRepository.findOne({
        where: { id: dishId },
        relations: ['restaurant'],
      });
      if (!dish) {
        return { ok: false, error: 'Dish not found' };
      }
      if (dish.restaurant.ownerId !== owner.id) {
        return { ok: false, error: "You can't edit the dish" };
      }
      await this.dishRepository.save({
        id: dishId,
        ...editDishDto,
      });
      return { ok: true, dish };
    } catch (error) {
      return { ok: false, error: "Couldn't edit the dish" };
    }
  }

  async deleteDish(owner: User, dishId: number): Promise<DeleteDishOutput> {
    try {
      const dish = await this.dishRepository.findOne({
        where: { id: dishId },
        relations: ['restaurant'],
      });
      if (!dish) {
        return { ok: false, error: 'Dish not found' };
      }
      if (dish.restaurant.ownerId !== owner.id) {
        return { ok: false, error: "You can't delete the dish" };
      }
      await this.dishRepository.delete(dishId);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: "Couldn't delete the dish" };
    }
  }
}
