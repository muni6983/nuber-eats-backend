import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entites/users.entiy';
import { Repository } from 'typeorm';
import {
  CreatePaymentDto,
  CreatePaymentOutput,
  GetAllPaymentsOutput,
} from './dtos/payment.dto';
import { Payment } from './entities/payment.entity';
import { Cron, Interval, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async createPayment(
    owner: User,
    createPaymentDto: CreatePaymentDto,
  ): Promise<CreatePaymentOutput> {
    try {
      const restaurant = await this.restaurantRepository.findOne(
        createPaymentDto.restaurantId,
      );
      if (!restaurant) {
        return { ok: false, error: 'Restaurant not found.' };
      }
      if (restaurant.ownerId !== owner.id) {
        return { ok: false, error: 'You are not allowed to do this.' };
      }
      const payment = await this.paymentsRepository.save(
        this.paymentsRepository.create({
          transactionId: createPaymentDto.transactionId,
          user: owner,
          restaurant,
        }),
      );
      restaurant.isPromoted = true;
      const date = new Date();
      date.setDate(date.getDate() + 7);
      restaurant.promoteUntil = date;
      this.restaurantRepository.save(restaurant);
      return { ok: true, payment };
    } catch (error) {
      return { ok: false, error: "Couldn't load payment'" };
    }
  }

  async getAllPayments(owner: User): Promise<GetAllPaymentsOutput> {
    try {
      const payments = await this.paymentsRepository.find({ user: owner });
      if (!payments) {
        return { ok: false, error: 'Payments not found' };
      }
      return { ok: true, payments };
    } catch (error) {
      return { ok: false, error: "Couldn't load all payments'" };
    }
  }
}
