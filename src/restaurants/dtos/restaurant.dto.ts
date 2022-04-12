import { OmitType, PickType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { Restaurant } from '../entities/restaurant.entity';

export class CreateRestaurantDto extends PickType(Restaurant, [
  'name',
  'address',
  'coverImg',
]) {
  @IsString()
  categoryName: string;
}

export class CreateRestaurantOutput extends MutationOutput {}
