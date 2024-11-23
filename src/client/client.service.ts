import { Injectable } from '@nestjs/common';

import { ClientRepository } from './client.repository';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { DeviceRepository } from 'src/device/device.repository';
import { RoleRepository } from 'src/role/role.repository';

@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly deviceRepository: DeviceRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

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

  async create(createClientDto: CreateClientDto) {
    const device = await this.deviceRepository.findOne({
      where: { id: createClientDto.deviceId },
    });
    const client = await this.clientRepository.create({
      ...createClientDto,
      device,
    });
    return await this.clientRepository.save(client);
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const role = await this.roleRepository.findOne({
      where: { id: updateClientDto.roleId },
    });
    await this.clientRepository.update(id, { role });

    return await this.clientRepository.findOne({
      where: { id },
      relations: ['device', 'role', 'games'],
    });
  }
}
