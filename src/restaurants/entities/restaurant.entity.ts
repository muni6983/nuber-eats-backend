import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entites/core.entity';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entites/users.entiy';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { Category } from './category.entity';
import { Dish } from './dish.entity';

@Entity()
export class Restaurant extends CoreEntity {
  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column({ default: null })
  coverImg: string;

  @IsString()
  @Column()
  address: string;

  @ManyToOne((type) => Category, (category) => category.restaurants, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  @OneToMany((type) => Dish, (dish) => dish.restaurant)
  menu: Dish[];

  @ManyToOne((type) => User, (user) => user.restaurants, {
    onDelete: 'CASCADE',
  })
  owner: User;

  @OneToMany((type) => Order, (order) => order.restaurant)
  orders: Order[];

  @IsString()
  @RelationId((restaurant: Restaurant) => restaurant.owner)
  ownerId: number;
}
