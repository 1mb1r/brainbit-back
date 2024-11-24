import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Game } from './Game';
import { Client } from './Client';

export interface Prompt {
  prompt: string;
}

export interface Action {
  title: string;
  isLocked: boolean;
  effect: Prompt;
}

export interface Exam {
  title: string;
  effect: Prompt;
}

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
  time: string;

  @Column({
    nullable: true,
  })
  image: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  order: number;

  @Column({
    nullable: true,
  })
  prompt: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  actions: Action[];

  @Column({
    type: 'json',
    nullable: true,
  })
  exam: Exam;
}
