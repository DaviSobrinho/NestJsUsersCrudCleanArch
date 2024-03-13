import { Injectable } from "@nestjs/common";
import { PermissionsService } from "../permissions.service";
import { AuthJWTDto } from "src/auth/dto/authJWT.dto";

@Injectable()
export class GetPermissionByIdUseCase{
  constructor(private permissionsService : PermissionsService){}
  async getPermissionById(id : number,user: AuthJWTDto) {
    if(user.permission != 1){
      return {message: 'You do not have permission to perform this action'}
    }
    try{
      const foundPermission = await this.permissionsService.findOneById(id)
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