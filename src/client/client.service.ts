import { Injectable } from '@nestjs/common';

import { ClientRepository } from './client.repository';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  findAll() {
    const clients = this.clientRepository.find({
      relations: ['device', 'role', 'games'],
    });
    return clients;
  }

  findOne(id: number) {
    const client = this.clientRepository.findOne({
      where: { id },
      relations: ['device', 'role', 'games'],
    });
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

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.clientRepository.update(id, updateClientDto);
  }
}
