import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entites/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class Category extends CoreEntity {
  @IsString()
  @Column({ unique: true })
  name: string;

  @IsString()
  @Column({ nullable: true })
  coverImg: string;

  @IsString()
  @Column({ unique: true })
  slug: string;

  @OneToMany((type) => Restaurant, (restaurant) => restaurant.category)
  restaurants: Restaurant[];
}
