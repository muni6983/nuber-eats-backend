import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entites/users.entiy';
import { Repository } from 'typeorm';
import {
  CreateRestaurantDto,
  CreateRestaurantOutput,
} from './dtos/restaurant.dto';
import { Category } from './entities/category.entity';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantsRepository: Repository<Restaurant>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
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
      const categoryName = createRestaurantDto.categoryName
        .trim()
        .toLowerCase();
      const categorySlug = categoryName.replace(/ /g, '-');
      let category = await this.categoryRepository.findOne({
        slug: categorySlug,
      });
      if (!category) {
        category = await this.categoryRepository.save(
          this.categoryRepository.create({
            slug: categorySlug,
            name: categoryName,
          }),
        );
      }
      newRestaurant.category = category;
      await this.restaurantsRepository.save(newRestaurant);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: "Couldn't create Restaurant'" };
    }
  }
}
