import { Body, Controller, Post } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entites/users.entiy';
import { CreateOrderDto, CreateOrderOutput } from './dtos/order.dto';
import { OrderService } from './orders.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Role(['CLIENT'])
  createOrder(
    @AuthUser() customer: User,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderOutput> {
    return this.orderService.createOrder(customer, createOrderDto);
  }
}
