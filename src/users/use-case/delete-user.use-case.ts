import { Injectable } from "@nestjs/common";
import { UsersService } from "../users.service";
import { AuthJWTDto } from "src/auth/dto/authJWT.dto";

@Injectable()
export class DeleteUserUseCase{
  constructor(private usersService : UsersService){}
  async deleteUser(id : number, user : AuthJWTDto) {
    if(user.id != id){
      if(user.permission != 1 && user.permission != 2){
        return {message: 'You do not have permission to perform this action'}
      }
    }
    try{
      const foundId = this.usersService.getUserById(id)
      if(foundId != null){
        await this.usersService.remove(id)
        return {message: 'User deleted successfully'}
      }else{
        return {message: 'User not found'}
      }
    }catch{
      return {message: 'Failed to retrieve the user'}
    }
  }
}