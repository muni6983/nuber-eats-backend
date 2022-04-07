import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

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
}
