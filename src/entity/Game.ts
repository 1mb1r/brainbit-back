import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
  JoinColumn,
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

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    nullable: true,
  })
  state: string;

  @ManyToMany(() => Client, (client) => client.games)
  @JoinTable()
  clients: Client[];

  @OneToMany(() => GameContent, (gameContent) => gameContent.game)
  gameContents: GameContent[];

  @OneToOne(() => Client, (client) => client.currentGame)
  @JoinColumn()
  currentPlayer: Client;
}
