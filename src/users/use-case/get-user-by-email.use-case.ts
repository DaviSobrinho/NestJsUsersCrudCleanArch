import { Injectable } from "@nestjs/common";
import { AuthJWTDto } from "src/auth/dto/authJWT.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class GetUserByEmailUseCase{
  constructor(private usersService : UsersService){}
  async getUserByEmail(email : string) {
    try{
      const foundUser = await this.usersService.getUserByEmail(email)
      if(foundUser != null){
        return foundUser
      }else{
        return {message: 'Email not found'}
      }
    }catch{
      return {message: 'Failed to retrieve the user'}
    }
  }
}