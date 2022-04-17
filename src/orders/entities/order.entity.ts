import { IsArray, IsNumber } from 'class-validator';
import { CoreEntity } from 'src/common/entites/core.entity';
import { Dish } from 'src/restaurants/entities/dish.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entites/users.entiy';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

export enum OrderStatus {
  PENDING = 'PENDING',
  COOKING = 'COOKING',
  PICKEDUP = 'PICKEDUP',
  DELIVERED = 'DELIVERED',
}

@Entity()
export class Order extends CoreEntity {
  @ManyToOne((type) => User, (user) => user.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  customer?: User;

  @ManyToOne((type) => User, (user) => user.rides, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  driver?: User;

  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  restaurant: Restaurant;

  @IsArray()
  @ManyToMany((type) => Dish)
  @JoinTable()
  dishes: Dish[];

  @Column({ nullable: true })
  @IsNumber()
  total?: number;

  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;
}
