import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entites/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Restaurant extends CoreEntity {
  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
  coverImg: string;

  @IsString()
  @Column()
  address: string;

  @ManyToOne((type) => Category, (category) => category.restaurants)
  category: Category;
}
