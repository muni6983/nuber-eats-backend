import { IsBoolean, IsString, Length } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @Length(5, 10)
  name: string;

  @IsBoolean()
  isVegan: boolean;

  @IsString()
  address: string;

  @IsString()
  @Length(5, 10)
  ownerName: string;

  @IsString()
  categoryName: string;
}
