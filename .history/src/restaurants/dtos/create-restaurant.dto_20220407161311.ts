import { OmitType } from '@nestjs/mapped-types';
import { Restaurant } from '../entities/restaurant.entity';

export class CreateRestaurantDto extends OmitType(Restaurant, ['id']) {}
