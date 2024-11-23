import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Device } from '../entity/Device';

export class DeviceRepository extends Repository<Device> {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {
    super(
      deviceRepository.target,
      deviceRepository.manager,
      deviceRepository.queryRunner,
    );
  }
}
