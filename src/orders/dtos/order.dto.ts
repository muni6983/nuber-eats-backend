import { PickType } from '@nestjs/mapped-types';
import { IsArray, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { DishOption } from 'src/restaurants/entities/dish.entity';
import { OrderItemOption } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';

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

export class GetOrdersOutput extends MutationOutput {
  @IsOptional()
  orders?: Order[];
}

export class GetOrderOutput extends MutationOutput {
  @IsOptional()
  order?: Order;
}

export class EditOrderDto extends PickType(Order, ['status']) {}

export class EditOrderOutput extends MutationOutput {
  @IsOptional()
  order?: Order;
}
