import { Injectable } from '@nestjs/common';

import { ClientRepository } from './client.repository';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  findAll() {
    const clients = this.clientRepository.find();
    return clients;
  }

  findOne(id: number) {
    const client = this.clientRepository.findOne({ where: { id } });
    return client;
  }

  async getCurrentGameId(mac_address: string) {
    const client = await this.clientRepository.findOne({
      where: {
        device: {
          mac_address: mac_address,
        },
      },
      relations: ['games'],
    });
    const game = client.games.find((game) => game.state !== 'finished');

    return game.id;
  }

  create(createClientDto: CreateClientDto) {
    return this.clientRepository.save(createClientDto);
  }
}
