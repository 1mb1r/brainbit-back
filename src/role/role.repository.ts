import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Role } from 'src/entity/Role';

export class RoleRepository extends Repository<Role> {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {
    super(
      roleRepository.target,
      roleRepository.manager,
      roleRepository.queryRunner,
    );
  }
}
