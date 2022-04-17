import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entites/users.entiy';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(customer: User, createOrderDto: CreateOrderDto) {
    return { ok: true };
  }
}
