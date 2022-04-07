import { IsString } from 'class-validator';
import { TypeOrmEntity } from 'src/common/typeOrm.entity';
import { Column, Entity } from 'typeorm';

type UserRole = 'client' | 'owner' | 'delivery';

@Entity()
export class User extends TypeOrmEntity {
  @Column()
  @IsString()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column()
  @IsString()
  role: string;
}
