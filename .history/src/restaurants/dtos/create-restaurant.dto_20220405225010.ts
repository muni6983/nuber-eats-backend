import { InputType } from "@nestjs/graphql";

@InputType()
export class CreateRestaurantDto {
  @Field()name: string,
    @Field()
    isVegan: boolean,
    @Field()
    address: string,
    @Field()
    ownerName: string,
}