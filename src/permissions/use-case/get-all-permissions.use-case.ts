import { Injectable } from "@nestjs/common";
import { PermissionsService } from "../permissions.service";
import { AuthJWTDto } from "src/auth/dto/authJWT.dto";

@Injectable()
export class GetAllPermissionsUseCase{
  constructor(private permissionsService : PermissionsService){}
  async getAllPermissions(user: AuthJWTDto) {
    if(user.permission != 1){
      return {message: 'You do not have permission to perform this action'}
    }
    try{
      return await this.permissionsService.findAll()
    }catch{
      return {message: 'Failed to retrieve permission'}
    }
  }
}