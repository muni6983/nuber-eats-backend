import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entites/users.entiy';
import { Repository } from 'typeorm';
import {
  CreateRestaurantDto,
  CreateRestaurantOutput,
  EditRestaurantDto,
  EditRestaurantOutput,
} from './dtos/restaurant.dto';
import { Category } from './entities/category.entity';
import { Restaurant } from './entities/restaurant.entity';
import { CategoryRepository } from './repositories/category.repository';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantsRepository: Repository<Restaurant>,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  getAll() {
    return this.restaurantsRepository.find();
  }

  async getRestaurantById(id: number) {
    const findRestaurant = await this.restaurantsRepository.findOne({ id });
    return findRestaurant;
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
      return { ok: true };
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
      console.log('restaurant Id typ222222 : ', typeof restaurantId);

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
}
