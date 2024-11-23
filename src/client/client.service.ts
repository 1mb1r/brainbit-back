import { Injectable } from '@nestjs/common';

import { ClientRepository } from './client.repository';

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
}
