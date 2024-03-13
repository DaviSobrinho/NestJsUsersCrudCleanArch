import { Injectable } from "@nestjs/common";
import { PermissionsService } from "../permissions.service";
import { CreatePermissionDto } from "../dto/create-permission.dto";
import * as bcrypt from 'bcrypt';
import { ConfigService } from "@nestjs/config";
import { AuthJWTDto } from "src/auth/dto/authJWT.dto";

@Injectable()
export class CreatePermissionUseCase{
  constructor(private permissionsService : PermissionsService){}
  async createPermission(createPermissionDto: CreatePermissionDto,user : AuthJWTDto) {
    if(user.permission != 1){
      return {message: 'You do not have permission to perform this action'}
    }
    try{
      const foundPermission = await this.permissionsService.findOneByPermission(createPermissionDto.permission)
      if(foundPermission != null){
        return ({message: 'The permission already exists'})
      }
    }catch{
      return ({message: 'Failed to verify the permission'})
    }
    await this.permissionsService.create(createPermissionDto)
    return {message: 'Permission created succesfully'}
  }
  
}