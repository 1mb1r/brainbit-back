import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameContentService } from './game-content.service';
import { GameContentController } from './game-content.controller';
import { GameContentRepository } from './game-content.repository';
import { GameContent } from 'src/entity/GameContent';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  imports: [TypeOrmModule.forFeature([GameContent]), OpenaiModule],
  controllers: [GameContentController],
  providers: [GameContentService, GameContentRepository],
})
export class GameContentModule {}
