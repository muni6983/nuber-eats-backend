import { PickType } from '@nestjs/mapped-types';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { Verification } from '../entites/verification.entity';

export class VerifyEmailOutputDto extends MutationOutput {}

export class VerifyEmailDto extends PickType(Verification, ['code']) {}
