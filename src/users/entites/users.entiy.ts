import { InternalServerErrorException } from '@nestjs/common';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entites/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Order } from 'src/orders/entities/order.entity';
export enum UserRole {
  CLIENT = 'CLIENT',
  OWNER = 'OWNER',
  DELIVERY = 'DELIVERY',
}

@Entity()
export class User extends CoreEntity {
  @Column()
  @IsString()
  email: string;

  @Column({ select: false })
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ default: false })
  @IsOptional()
  @IsBoolean()
  verified: boolean;

  @OneToMany((type) => Restaurant, (restaurant) => restaurant.owner)
  restaurants: Restaurant[];

  @OneToMany((type) => Order, (order) => order.customer)
  orders: Order[];

  @OneToMany((type) => Order, (order) => order.driver)
  rides: Order[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await hash(this.password, 10);
      } catch (e) {
        console.log('error! :', e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.log('error! :', e);
      throw new InternalServerErrorException();
    }
  }
}
