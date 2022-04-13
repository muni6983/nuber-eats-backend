import { IsArray, IsOptional, IsString } from 'class-validator';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { PaginationOutput } from 'src/common/dtos/pagination.dto';
import { Column } from 'typeorm';
import { Category } from '../entities/category.entity';

export class AllCategoriesOutput extends PaginationOutput {
  @IsArray()
  @Column({ nullable: true })
  categories?: Category[];
}

export class CategoryOutput extends PaginationOutput {
  @Column({ nullable: true })
  category?: Category;
}
