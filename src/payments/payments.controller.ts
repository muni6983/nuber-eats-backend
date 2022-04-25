import { Body, Controller, Post } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entites/users.entiy';
import { CreatePaymentDto, CreatePaymentOutput } from './dtos/payment.dto';
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
}
