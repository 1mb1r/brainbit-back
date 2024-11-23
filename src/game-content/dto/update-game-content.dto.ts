import { PartialType } from '@nestjs/mapped-types';

import { CreateGameContentDto } from './create-game-content.dto';

export class UpdateGameContentDto extends PartialType(CreateGameContentDto) {}
