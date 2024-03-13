import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class GetUserByCPFCase{
  constructor(private usersService : UsersService){}
  async getUserByCPF(cpf : string) {
    try{
      const foundUser = await this.usersService.getUserByCPF(cpf)
      if(foundUser != null){
        return foundUser
      }else{
        return {message: 'CPF not found'}
      }
    }catch{
      return {message: 'Failed to retrieve the user'}
    }
  }
}