import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entites/core.entity';
import { User } from 'src/users/entites/users.entiy';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Restaurant extends CoreEntity {
  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
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
}
