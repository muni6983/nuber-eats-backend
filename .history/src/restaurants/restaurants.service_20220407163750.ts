import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}

  getAll() {
    return this.restaurants.find();
  }

  async getRestaurantById(id: number) {
    const findRestaurant = await this.restaurants.findOne({ id });
    return findRestaurant;
  }

  async createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    const newRestaurant = this.restaurants.create(createRestaurantDto);
    return this.restaurants.save(newRestaurant);
  }

  async updateRestaurant(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    const updateRestaurant = await this.restaurants.update(
      id,
      updateRestaurantDto,
    );
  }
}
