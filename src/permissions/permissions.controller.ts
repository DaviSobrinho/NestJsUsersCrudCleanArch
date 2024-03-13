import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { CreatePermissionUseCase } from './use-case/create-permission.use-case';
import { GetPermissionByIdUseCase } from './use-case/get-permission-by-id.use-case';
import { GetPermissionByPermissionUseCase } from './use-case/get-permission-by-permission.use-case';
import { GetAllPermissionsUseCase } from './use-case/get-all-permissions.use-case';
import { UpdatePermissionUseCase } from './use-case/update-permission.use-case';
import { DeletePermissionUseCase } from './use-case/delete-permission.use-case';
import { Public } from 'src/auth/validator/public-routes.validator';
import { DecodeTokenUseCase } from 'src/auth/use-case/decode-token.use-case';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('permissions')
export class PermissionsController {
  constructor(
    private readonly createPermissionUseCase: CreatePermissionUseCase,
    private readonly getPermissionByIdUseCase: GetPermissionByIdUseCase,
    private readonly getAllPermissionsUseCase: GetAllPermissionsUseCase,
    private readonly updatePermissionUseCase: UpdatePermissionUseCase,
    private readonly deletePermissionUseCase: DeletePermissionUseCase,
    private readonly decodeTokenUseCase: DecodeTokenUseCase) {}
    
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto, @Request() req) {
    return await this.createPermissionUseCase.createPermission(createPermissionDto, req.user);
  }
  
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req) {
    return await this.getAllPermissionsUseCase.getAllPermissions(req.user);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getPermission(@Param('id') id: number, @Request() req) {
    return await this.getPermissionByIdUseCase.getPermissionById(+id,req.user);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() updatePermissionDto: UpdatePermissionDto, @Request() req) {
    return await this.updatePermissionUseCase.updatePermission(+id, updatePermissionDto,req.user);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.deletePermissionUseCase.deletePermission(+id,req.user);
  }
}
