import { PickType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { Column } from 'typeorm';
import { Order } from '../entities/order.entity';

export class CreateOrderDto extends PickType(Order, ['items']) {
  @IsNumber()
  restaurantId: number;
}

export class CreateOrderOutput extends MutationOutput {}
