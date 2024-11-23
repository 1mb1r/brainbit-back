import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { DeviceRepository } from './device.repository';
import { Device } from 'src/entity/Device';

@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  controllers: [DeviceController],
  providers: [DeviceService, DeviceRepository],
  exports: [DeviceService, DeviceRepository],
})
export class DeviceModule {}
