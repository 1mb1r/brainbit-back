import { Injectable } from '@nestjs/common';

import { CreateGameContentDto } from './dto/create-game-content.dto';
import { UpdateGameContentDto } from './dto/update-game-content.dto';
import { GameContentRepository } from './game-content.repository';

@Injectable()
export class GameContentService {
  constructor(private readonly gameContentRepository: GameContentRepository) {}

  create(createGameContentDto: CreateGameContentDto) {
    return 'This action adds a new gameContent';
  }

  findAll() {
    return `This action returns all gameContent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gameContent`;
  }

  update(id: number, updateGameContentDto: UpdateGameContentDto) {
    return `This action updates a #${id} gameContent`;
  }

  remove(id: number) {
    return `This action removes a #${id} gameContent`;
  }
}
