import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Game } from 'src/entity/Game';

export class GameRepository extends Repository<Game> {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {
    super(
      gameRepository.target,
      gameRepository.manager,
      gameRepository.queryRunner,
    );
  }
}
