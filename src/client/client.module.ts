import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from 'src/entity/Client';
import { ClientRepository } from './client.repository';
import { DeviceModule } from 'src/device/device.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), DeviceModule, RoleModule],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository],
  exports: [ClientRepository, ClientService],
})
export class ClientModule {}
