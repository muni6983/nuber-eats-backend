import { OmitType } from '@nestjs/mapped-types';
import { IsBoolean, IsString, Length } from 'class-validator';
import { Restaurant } from '../entities/restaurant.entity';

export class CreateRestaurantDto extends OmitType(Restaurant, ['id']) {}
