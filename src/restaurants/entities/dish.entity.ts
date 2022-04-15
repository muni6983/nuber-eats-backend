import { IsNumber, IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entites/core.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class Dish extends CoreEntity {
  @IsString()
  @Column()
  name: string;

  @IsNumber()
  @Column()
  price: number;

  @IsString()
  @Column()
  photo: string;

  @IsString()
  @Column()
  @Length(5, 140)
  description: string;

  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.menu, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @IsString()
  @RelationId((dish: Dish) => dish.restaurant)
  restaurantId: number;
}
