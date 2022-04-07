import { InternalServerErrorException } from '@nestjs/common';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entites/core.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { hash } from 'bcrypt';
export enum UserRole {
  CLIENT = 'client',
  OWNER = 'owner',
  DELIVERY = 'delivery',
}

@Entity()
export class User extends CoreEntity {
  @Column()
  @IsString()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  @IsString()
  role: UserRole;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await hash(this.password, 10);
    } catch (e) {
      console.log('error! :', e);
      throw new InternalServerErrorException();
    }
  }
}
