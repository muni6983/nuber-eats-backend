import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entites/users.entiy';
import {
  CreateOrderDto,
  CreateOrderOutput,
  GetOrderOutput,
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

  @Get('/:id')
  @Role(['Any'])
  getOrder(
    @Param('id') orderId: string,
    @AuthUser() user: User,
  ): Promise<GetOrderOutput> {
    return this.orderService.getOrder(+orderId, user);
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
