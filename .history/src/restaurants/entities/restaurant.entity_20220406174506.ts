import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @ObjectType()
// export class Restaurant {
//   @Field((type) => String)
//   name: string;

//   @Field((type) => Boolean)
//   isVegan: boolean;

//   @Field((type) => String)
//   address: string;

//   @Field((type) => String)
//   ownerName: string;
// }

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @IsString()
  @Column()
  name: string;

  @IsBoolean()
  @Column()
  isVegan: boolean;

  @IsString()
  @Column()
  address: string;

  @IsString()
  @Column()
  ownerName: string;

  @IsString()
  @Column()
  categoryName: string;
}
