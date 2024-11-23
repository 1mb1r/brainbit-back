import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'logs',
})
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  event: string;

  @Column({
    nullable: true,
  })
  status: string;

  @CreateDateColumn({})
  created_at: Date;

  @UpdateDateColumn({})
  updated_at: Date;
}
