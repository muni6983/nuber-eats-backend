import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { Column } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';

export class CreateRestaurantDto extends PickType(Restaurant, [
  'name',
  'address',
  'coverImg',
]) {
  @IsString()
  @Column()
  categoryName: string;
}

export class CreateRestaurantOutput extends MutationOutput {}

export class EditRestaurantDto extends PartialType(CreateRestaurantDto) {}

export class EditRestaurantOutput extends MutationOutput {}

export class DeleteRestaurantOutput extends MutationOutput {}
