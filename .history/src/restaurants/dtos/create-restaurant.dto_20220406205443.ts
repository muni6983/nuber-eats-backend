import { OmitType } from '@nestjs/mapped-types';
import { IsBoolean, IsString, Length } from 'class-validator';
import { Restaurant } from '../entities/restaurant.entity';

export class CreateRestaurantDto extends OmitType(Restaurant, ['id']) {
  @IsString()
  @Length(5, 10)
  name: string;

  @IsBoolean()
  isVegan: boolean;

  @IsString()
  address: string;

  @IsString()
  @Length(5, 10)
  ownerName: string;

  @IsString()
  categoryName: string;
}
