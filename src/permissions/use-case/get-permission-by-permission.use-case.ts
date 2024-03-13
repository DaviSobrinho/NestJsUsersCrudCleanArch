import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { PermissionsService } from "../permissions.service";
import { AuthJWTDto } from "src/auth/dto/authJWT.dto";

@Injectable()
export class GetPermissionByPermissionUseCase{
  constructor(private permissionsService : PermissionsService){}
  async getPermissionByPermission(permission : string,user: AuthJWTDto) {
    if(user.permission != 1){
      return {message: 'You do not have permission to perform this action'}
    }
    try{
      const foundPermission = await this.permissionsService.findOneByPermission(permission)
      if(foundPermission != null){
        return foundPermission
      }else{
        return {message: 'Permission not found'}
      }
    }catch{
      return {message: 'Failed to retrieve the permission'}
    }
  }
}