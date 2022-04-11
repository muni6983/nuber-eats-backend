import { IsString } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { CoreEntity } from 'src/common/entites/core.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './users.entiy';

@Entity()
export class Verification extends CoreEntity {
  @Column()
  @IsString()
  code: string;

  @OneToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @BeforeInsert()
  createCode(): void {
    this.code = uuidv4();
  }
}
