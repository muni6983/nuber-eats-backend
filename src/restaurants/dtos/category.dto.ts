import { IsArray, IsOptional, IsString } from 'class-validator';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { PaginationOutput } from 'src/common/dtos/pagination.dto';
import { Column } from 'typeorm';
import { Category } from '../entities/category.entity';
import { Restaurant } from '../entities/restaurant.entity';

export class AllCategoriesOutput extends PaginationOutput {
  @IsArray()
  @Column({ nullable: true })
  results?: Category[];
}

export class CategoryOutput extends PaginationOutput {
  @Column({ nullable: true })
  results?: Category;

  @Column({ nullable: true })
  restaurants?: Restaurant[];
}
