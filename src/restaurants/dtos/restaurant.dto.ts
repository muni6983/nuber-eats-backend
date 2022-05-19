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

export class CreateRestaurantOutput extends MutationOutput {
  @Column()
  restaurant?: Restaurant;
}

export class EditRestaurantDto extends PartialType(CreateRestaurantDto) {}

export class EditRestaurantOutput extends MutationOutput {}

export class DeleteRestaurantOutput extends MutationOutput {}

export class RestaurantOuput extends PaginationOutput {
  @Column({ nullable: true })
  @IsArray()
  results?: Restaurant[];
}

export class FindRestaurantOutput extends MutationOutput {
  @Column({ nullable: true })
  restaurant?: Restaurant;
}

export class SearchRestaurantDto {
  @Column()
  @IsString()
  query: string;
}

export class SearchRestaurantOutput extends PaginationOutput {
  @Column({ nullable: true })
  @IsArray()
  results?: Restaurant[];
}
