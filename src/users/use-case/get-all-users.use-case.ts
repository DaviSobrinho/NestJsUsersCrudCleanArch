import { Injectable } from "@nestjs/common";
import { AuthJWTDto } from "src/auth/dto/authJWT.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class GetAllUsersUseCase{
  constructor(private usersService : UsersService){}
  async getAllUsers(user : AuthJWTDto) {
    if(user.permission != 1){
      return {message: 'You do not have permission to perform this action'}
    }
    try{
      return await this.usersService.getAllUsers()
    }catch{
      return {message: 'Failed to retrieve users'}
    }
  }
}