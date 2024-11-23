import { Injectable } from '@nestjs/common';

import { DeviceRepository } from './device.repository';

@Injectable()
export class DeviceService {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  findAll() {
    const devices = this.deviceRepository.find();
    return devices;
  }

  findOne(id: number) {
    const device = this.deviceRepository.findOne({ where: { id } });
    return device;
  }
}
