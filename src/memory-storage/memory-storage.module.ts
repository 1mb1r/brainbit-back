import { Module } from '@nestjs/common';

import { MemoryStorageService } from './memory-storage.service';
import { MemoryStorageController } from './memory-storage.controller';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [ClientModule],
  controllers: [MemoryStorageController],
  providers: [MemoryStorageService],
})
export class MemoryStorageModule {}
