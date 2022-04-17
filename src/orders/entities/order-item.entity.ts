import { IsArray, IsOptional, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entites/core.entity';
import { Dish } from 'src/restaurants/entities/dish.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export class OrderItemOption {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  choice?: string;
}
@Entity()
export class OrderItem extends CoreEntity {
  @ManyToOne((type) => Dish, { nullable: true, onDelete: 'SET NULL' })
  dish: Dish;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  @IsArray()
  options?: OrderItemOption[];
}
