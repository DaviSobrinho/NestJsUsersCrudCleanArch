import { Injectable } from "@nestjs/common";
import { PermissionsService } from "../permissions.service";
import { CreatePermissionDto } from "../dto/create-permission.dto";
import { AuthJWTDto } from "src/auth/dto/authJWT.dto";

@Injectable()
export class DeletePermissionUseCase{
  constructor(private permissionsService : PermissionsService){}
  async deletePermission(id : number,user : AuthJWTDto) {
    if(user.permission != 1){
      return {message: 'You do not have permission to perform this action'}
    }
    try{
      const foundId = this.permissionsService.findOneById(id)
      if(foundId != null){
        await this.permissionsService.remove(id)
        return {message: 'Permission deleted successfully'}
      }else{
        return {message: 'Permission not found'}
      }
    }catch{
      return {message: 'Failed to retrieve the permission'}
    }
  }
}