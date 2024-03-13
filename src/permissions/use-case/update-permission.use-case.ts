import { Injectable } from "@nestjs/common";
import { PermissionsService } from "../permissions.service";
import { CreatePermissionDto } from "../dto/create-permission.dto";
import { UpdatePermissionDto } from "../dto/update-permission.dto";
import { AuthJWTDto } from "src/auth/dto/authJWT.dto";

@Injectable()
export class UpdatePermissionUseCase{
  constructor(private permissionsService : PermissionsService){}
  async updatePermission(id: number,updatePermissionDto: UpdatePermissionDto, user:AuthJWTDto) {
    if(user.permission != 1){
      return {message: 'You do not have permission to perform this action'}
    }
    await this.permissionsService.update(id,updatePermissionDto)
    return {message: 'Permission updated successfully'}
  }
}