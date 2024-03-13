import { Injectable } from "@nestjs/common";
import { AuthJWTDto } from "src/auth/dto/authJWT.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class GetUserByIdUseCase{
  constructor(private usersService : UsersService){}
  async getUserById(id : number,user :AuthJWTDto) {
    if(user.id != id){
      if(user.permission != 1 && user.permission != 2){
        return {message: 'You do not have permission to perform this action'}
      }
    }
    try{
      const foundUser = await this.usersService.getUserById(id)
      if(foundUser != null){
        return foundUser
      }else{
        return {message: 'User not found'}
      }
    }catch{
      return {message: 'Failed to retrieve the user'}
    }
  }
}