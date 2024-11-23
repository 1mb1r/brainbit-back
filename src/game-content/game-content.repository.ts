import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { GameContent } from 'src/entity/GameContent';

export class GameContentRepository extends Repository<GameContent> {
  constructor(
    @InjectRepository(GameContent)
    private gameContentRepository: Repository<GameContent>,
  ) {
    super(
      gameContentRepository.target,
      gameContentRepository.manager,
      gameContentRepository.queryRunner,
    );
  }
}
