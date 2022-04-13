import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { PaginationOutput } from 'src/common/dtos/pagination.dto';
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

export class RestaurantOuput extends PaginationOutput {
  @Column({ nullable: true })
  @IsArray()
  restaurants?: Restaurant[];
}
