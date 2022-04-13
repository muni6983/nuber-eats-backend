import { IsArray, IsOptional, IsString } from 'class-validator';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { Column } from 'typeorm';
import { Category } from '../entities/category.entity';

export class AllCategoriesOutput extends MutationOutput {
  @IsArray()
  @Column({ nullable: true })
  categories?: Category[];
}

export class CategoryOutput extends MutationOutput {
  @Column({ nullable: true })
  category?: Category;
}
