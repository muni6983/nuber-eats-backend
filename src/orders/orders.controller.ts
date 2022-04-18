import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entites/users.entiy';
import {
  CreateOrderDto,
  CreateOrderOutput,
  GetOrdersOutput,
} from './dtos/order.dto';
import { OrderStatus } from './entities/order.entity';
import { OrderService } from './orders.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Role(['Any'])
  getOrders(
    @AuthUser() user: User,
    @Query('status') status: OrderStatus,
  ): Promise<GetOrdersOutput> {
    return this.orderService.getOrders(user, status);
  }

  @Post()
  @Role(['CLIENT'])
  createOrder(
    @AuthUser() customer: User,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderOutput> {
    return this.orderService.createOrder(customer, createOrderDto);
  }
}
