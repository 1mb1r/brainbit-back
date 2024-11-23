import { IsNotEmpty } from 'class-validator';

import { GameState } from '../types';

export class CreateGameDto {
  @IsNotEmpty({ message: 'State is required' })
  state: GameState;
}
