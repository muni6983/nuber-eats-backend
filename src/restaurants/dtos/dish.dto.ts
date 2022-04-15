import { PartialType, PickType } from '@nestjs/mapped-types';
import { Dish } from '../entities/dish.entity';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { Column } from 'typeorm';

export class CreateDishDto extends PickType(Dish, [
  'name',
  'description',
  'price',
  'options',
  'restaurantId',
]) {}

export class CreateDishOutput extends MutationOutput {
  @Column()
  dish?: Dish;
}

export class DeleteDishOutput extends MutationOutput {}

export class EditDishDto extends PickType(PartialType(Dish), [
  'name',
  'description',
  'price',
  'options',
]) {}

export class EditDishOuput extends MutationOutput {}
