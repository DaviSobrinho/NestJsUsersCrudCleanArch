import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { CreatePermissionUseCase } from './use-case/create-permission.use-case';
import { GetAllPermissionsUseCase } from './use-case/get-all-permissions.use-case';
import { GetPermissionByIdUseCase } from './use-case/get-permission-by-id.use-case';
import { GetPermissionByPermissionUseCase } from './use-case/get-permission-by-permission.use-case';
import { PrismaClient } from '@prisma/client';
import { PrismaPermissionRepository } from './repository/prisma-permission.repository';
import { UpdatePermissionUseCase } from './use-case/update-permission.use-case';
import { DeletePermissionUseCase } from './use-case/delete-permission.use-case';
import { DecodeTokenUseCase } from 'src/auth/use-case/decode-token.use-case';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService, CreatePermissionUseCase, GetAllPermissionsUseCase, GetPermissionByIdUseCase, GetPermissionByPermissionUseCase, PrismaClient, PrismaPermissionRepository,UpdatePermissionUseCase,DeletePermissionUseCase,DecodeTokenUseCase,JwtService],
})
export class PermissionsModule {}
