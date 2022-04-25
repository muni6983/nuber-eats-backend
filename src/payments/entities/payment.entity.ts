import { IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entites/core.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entites/users.entiy';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

@Entity()
export class Payment extends CoreEntity {
  @Column()
  @IsString()
  transactionId: string;

  @ManyToOne((type) => User, (user) => user.payments)
  user: User;

  @ManyToOne((type) => Restaurant)
  restaurant: Restaurant;

  @RelationId((payment: Payment) => payment.user)
  userId: number;

  @RelationId((payment: Payment) => payment.restaurant)
  restaurantId: number;
}
