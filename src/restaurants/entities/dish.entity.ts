import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { CoreEntity } from 'src/common/entites/core.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { Restaurant } from './restaurant.entity';

export class DishChoice {
  @Column()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsNumber()
  extra?: number;
}
export class DishOption {
  @Column()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsNumber()
  extra?: number;

  @Column({ nullable: true })
  @IsArray()
  choices?: DishChoice[];
}

@Entity()
export class Dish extends CoreEntity {
  @IsString()
  @Column()
  name: string;

  @IsNumber()
  @Column()
  price: number;

  @IsString()
  @Column({ nullable: true })
  photo: string;

  @IsString()
  @Column()
  @Length(5, 140)
  description: string;

  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.menu, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @IsNumber()
  @RelationId((dish: Dish) => dish.restaurant)
  restaurantId: number;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  @IsArray()
  options?: DishOption[];
}
