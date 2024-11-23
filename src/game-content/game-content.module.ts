import { Module } from '@nestjs/common';

import { GameContentService } from './game-content.service';
import { GameContentController } from './game-content.controller';

@Module({
  controllers: [GameContentController],
  providers: [GameContentService],
})
export class GameContentModule {}
