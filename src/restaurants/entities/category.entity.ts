import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entites/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class Category extends CoreEntity {
  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
  coverImg: string;

  @OneToMany((type) => Restaurant, (restaurant) => restaurant.category)
  restaurants: Restaurant[];
}
