import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
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

  createRestaurant(createRestaurantDto: CreateRestaurantDto) {
    const newRestaurant = this.restaurants.create(createRestaurantDto);
  }
}
