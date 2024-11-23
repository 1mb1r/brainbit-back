import { PartialType } from '@nestjs/mapped-types';

import { CreateGameDto } from './create-game.dto';

export class UpdateGameDto extends PartialType(CreateGameDto) {
  time_start?: Date;
  time_end?: Date;
}
