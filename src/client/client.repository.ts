import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Client } from 'src/entity/Client';

export class ClientRepository extends Repository<Client> {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {
    super(
      clientRepository.target,
      clientRepository.manager,
      clientRepository.queryRunner,
    );
  }
}
