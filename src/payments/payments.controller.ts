import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entites/users.entiy';
import {
  CreatePaymentDto,
  CreatePaymentOutput,
  GetAllPaymentsOutput,
} from './dtos/payment.dto';
import { PaymentService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @Role(['OWNER'])
  createPayment(
    @AuthUser() owner: User,
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<CreatePaymentOutput> {
    return this.paymentService.createPayment(owner, createPaymentDto);
  }

  @Get()
  @Role(['OWNER'])
  getAllPayments(@AuthUser() owner: User): Promise<GetAllPaymentsOutput> {
    return this.paymentService.getAllPayments(owner);
  }
}
