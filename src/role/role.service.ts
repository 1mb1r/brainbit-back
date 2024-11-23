import { Injectable } from '@nestjs/common';

import { RoleRepository } from './role.repository';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  findAll() {
    const roles = this.roleRepository.find();
    return roles;
  }

  create(createRoleDto: CreateRoleDto) {
    return this.roleRepository.save(createRoleDto);
  }
}
