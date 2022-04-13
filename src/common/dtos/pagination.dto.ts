import { IsNumber } from 'class-validator';
import { Column } from 'typeorm';
import { MutationOutput } from './output.dto';

export class Pagination {
  @Column({ default: 1 })
  @IsNumber()
  page: number;
}

export class PaginationOutput extends MutationOutput {
  @Column({ nullable: true })
  @IsNumber()
  totalPages?: number;
}
