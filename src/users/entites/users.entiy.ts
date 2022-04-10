import { InternalServerErrorException } from '@nestjs/common';
import { IsEnum, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entites/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { hash, compare } from 'bcrypt';
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
  @IsEnum(UserRole)
  role: UserRole;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    try {
      this.password = await hash(this.password, 10);
    } catch (e) {
      console.log('error! :', e);
      throw new InternalServerErrorException();
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
