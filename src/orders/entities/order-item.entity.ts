import { IsArray, IsOptional } from 'class-validator';
import { CoreEntity } from 'src/common/entites/core.entity';
import { Dish, DishOption } from 'src/restaurants/entities/dish.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class OrderItem extends CoreEntity {
  @ManyToOne((type) => Dish, { nullable: true, onDelete: 'SET NULL' })
  dish: Dish;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  @IsArray()
  options?: DishOption[];
}
