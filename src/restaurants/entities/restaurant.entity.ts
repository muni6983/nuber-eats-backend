import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @IsString()
  @Column()
  name: string;

  @IsOptional()
  @IsBoolean()
  @Column({ default: true })
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
