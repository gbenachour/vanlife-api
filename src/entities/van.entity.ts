import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export type VanType = 'simple' | 'rugged' | 'luxury';

@Entity({ name: 'vans' })
export class Van {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ length: 120 })
  name!: string;

  @Column()
  price!: number;

  @Column()
  description!: string;

  @Column()
  imageUrl!: string;

  @Column()
  type!: VanType;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.vans, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  host!: User;
}
