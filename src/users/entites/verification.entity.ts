import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entites/core.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './users.entiy';

@Entity()
export class Verification extends CoreEntity {
  @Column()
  @IsString()
  code: string;

  @OneToOne((type) => User)
  @JoinColumn()
  user: User;
}
