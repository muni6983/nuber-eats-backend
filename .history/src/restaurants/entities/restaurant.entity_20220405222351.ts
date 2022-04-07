import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Restaurant {
  @Field((type) => String)
  name: string;
  @Filed((type) => Boolean, { nullable: true })
  isGood?: Boolean;
}
