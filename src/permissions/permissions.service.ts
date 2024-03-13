import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaPermissionRepository } from './repository/prisma-permission.repository';

@Injectable()
export class PermissionsService {
  constructor(private permissionRepository : PrismaPermissionRepository){}
  async create(createPermissionDto: CreatePermissionDto) {
    return await this.permissionRepository.create(createPermissionDto);
  }

  async findAll() {
    return await this.permissionRepository.readAll();
  }

  async findOneById(id: number) {
    return await this.permissionRepository.readOneById(id);
  }

  async findOneByPermission(permission: string) {
    return await this.permissionRepository.readOneByPermission(permission);
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return await this.permissionRepository.update(id, updatePermissionDto);
  }

  async remove(id: number) {
    return await this.permissionRepository.delete(id);
  }
}
