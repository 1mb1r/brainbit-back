import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameService } from './game.service';
import { GameController } from './game.controller';
import { Game } from 'src/entity/Game';
import { GameRepository } from './game.repository';
import { ClientModule } from '../client/client.module';
import { OpenaiModule } from 'src/openai/openai.module';
import { GameContentModule } from 'src/game-content/game-content.module';
import { MemoryStorageModule } from 'src/memory-storage/memory-storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    ClientModule,
    OpenaiModule,
    GameContentModule,
    MemoryStorageModule,
  ],
  controllers: [GameController],
  providers: [GameService, GameRepository],
})
export class GameModule {}
