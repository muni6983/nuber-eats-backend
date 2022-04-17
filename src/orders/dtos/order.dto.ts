import { IsArray, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { DishOption } from 'src/restaurants/entities/dish.entity';

class CreateOrderItemDto {
  @IsNumber()
  dishId: number;

  @IsEnum(DishOption)
  @IsOptional()
  options?: DishOption;
}

export class CreateOrderDto {
  @IsNumber()
  restaurantId: number;

  @IsArray()
  options: CreateOrderItemDto[];
}

export class CreateOrderOutput extends MutationOutput {}
