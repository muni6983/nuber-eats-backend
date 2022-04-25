import { PickType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { Payment } from '../entities/payment.entity';

export class CreatePaymentDto extends PickType(Payment, ['transactionId']) {
  @IsNumber()
  restaurantId: number;
}

export class CreatePaymentOutput extends MutationOutput {
  @IsOptional()
  payment?: Payment;
}
