import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameService } from './game.service';
import { GameController } from './game.controller';
import { Game } from 'src/entity/Game';
import { GameRepository } from './game.repository';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), ClientModule],
  controllers: [GameController],
  providers: [GameService, GameRepository],
})
export class GameModule {}
