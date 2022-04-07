import { InputType } from "@nestjs/graphql";

@InputType()
export class CreateRestaurantDto {
  @Field()
  ('name') name: string,
    @Field()
    ('isVegan') isVegan: boolean,
    @Field()
    ('address') address: string,
    @Field()
    ('ownerName') ownerName: string,
}