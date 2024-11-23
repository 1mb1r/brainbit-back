import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
  Column,
  OneToOne,
} from 'typeorm';

import { Device } from './Device';
import { Role } from './Role';
import { Game } from './Game';
import { GameContent } from './GameContent';

@Entity({
  name: 'clients',
})
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Device, (device) => device.clients)
  @JoinColumn()
  device: Device;

  @ManyToOne(() => Role, (role) => role.clients)
  @JoinColumn()
  role: Role;

  @ManyToMany(() => Game, (game) => game.clients)
  games: Game[];

  @OneToMany(() => GameContent, (gameContent) => gameContent.client)
  gameContents: GameContent[];

  @OneToOne(() => Game, (game) => game.currentPlayer)
  currentGame: Game;
}
