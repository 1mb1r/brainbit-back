import { Controller, Get, Post, Body } from '@nestjs/common';

import { MemoryStorageService } from './memory-storage.service';
import { CreateMemoryStorageDto } from './dto/create-memory-storage.dto';
import { ClientService } from 'src/client/client.service';

@Controller('memory-storage')
export class MemoryStorageController {
  constructor(
    private readonly memoryStorageService: MemoryStorageService,
    private readonly clientService: ClientService,
  ) {}

  @Post()
  async addIndicators(@Body() createMemoryStorageDto: CreateMemoryStorageDto) {
    const deviceData = this.memoryStorageService.get(
      createMemoryStorageDto.mac_address,
    );

    const gameId = await this.clientService.getCurrentGameId(
      createMemoryStorageDto.mac_address,
    );

    if (!deviceData) {
      return this.memoryStorageService.set(createMemoryStorageDto.mac_address, [
        {
          gameId,
          concentration: [createMemoryStorageDto.data.concentration],
          relaxation: [createMemoryStorageDto.data.relaxation],
        },
      ]);
    }
    const gameData = deviceData.find((game) => game.gameId === gameId);
    if (gameData.concentration.length < 10) {
      gameData.concentration.push(createMemoryStorageDto.data.concentration);
    } else {
      gameData.concentration.shift();
      gameData.concentration.push(createMemoryStorageDto.data.concentration);
    }

    if (gameData.relaxation.length < 10) {
      gameData.relaxation.push(createMemoryStorageDto.data.relaxation);
    } else {
      gameData.relaxation.shift();
      gameData.relaxation.push(createMemoryStorageDto.data.relaxation);
    }

    return deviceData;
  }

  @Get()
  findAll() {
    return this.memoryStorageService.getAll();
  }
}
