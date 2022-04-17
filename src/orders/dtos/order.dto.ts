import { IsArray, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { DishOption } from 'src/restaurants/entities/dish.entity';
import { OrderItemOption } from '../entities/order-item.entity';

class CreateOrderItemDto {
  @IsNumber()
  dishId: number;

  @IsEnum(DishOption)
  @IsOptional()
  @IsArray()
  options?: OrderItemOption[];
}

export class CreateOrderDto {
  @IsNumber()
  restaurantId: number;

  @IsArray()
  items: CreateOrderItemDto[];
}

export class CreateOrderOutput extends MutationOutput {}
