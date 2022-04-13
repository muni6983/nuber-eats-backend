import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entites/core.entity';
import { User } from 'src/users/entites/users.entiy';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Category } from './category.entity';

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

  @ManyToOne((type) => User, (user) => user.restaurants, {
    onDelete: 'CASCADE',
  })
  owner: User;

  @IsString()
  @RelationId((restaurant: Restaurant) => restaurant.owner)
  ownerId: number;
}
