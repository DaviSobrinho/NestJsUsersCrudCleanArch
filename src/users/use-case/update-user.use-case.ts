import { Injectable } from "@nestjs/common";
import { UsersService } from "../users.service";
import { UpdateUserDto } from "../dto/updateUser.dto";
import { AuthJWTDto } from "src/auth/dto/authJWT.dto";

@Injectable()
export class UpdateUserUseCase{
  constructor(private usersService : UsersService){}
  async updateUser(id: number,updateUserDto: UpdateUserDto, user : AuthJWTDto) {
    if(user.id != id){
      if(user.permission != 1 && user.permission != 2){
        return {message: 'You do not have permission to perform this action'}
      }
    }
    try{
      const foundId = this.usersService.getUserById(id)
      if(foundId != null){
        await this.usersService.update(id,updateUserDto)
        return {message: 'User updated successfully'}
      }else{
        return {message: 'User not found'}
      }
    }catch{
      return {message: 'Failed to update the user'}
    }
  }
}