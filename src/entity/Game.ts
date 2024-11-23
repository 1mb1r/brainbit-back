import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { Client } from './Client';
import { GameContent } from './GameContent';

@Entity({
  name: 'games',
})
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  time_start: Date;

  @Column({
    nullable: true,
  })
  time_end: Date;

  @Column({
    nullable: true,
  })
  state: string;

  @ManyToMany(() => Client)
  @JoinTable()
  clients: Client[];

  @OneToMany(() => GameContent, (gameContent) => gameContent.game)
  gameContents: GameContent[];
}
