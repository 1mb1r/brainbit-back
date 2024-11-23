import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Game } from './Game';
import { Client } from './Client';

@Entity({
  name: 'game_contents',
})
export class GameContent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Game, (game) => game.gameContents)
  @JoinColumn()
  game: Game;

  @ManyToOne(() => Client, (client) => client.gameContents)
  @JoinColumn()
  client: Client;

  @Column({
    nullable: true,
  })
  text: string;

  @Column({
    nullable: true,
  })
  prompt: string;
}
