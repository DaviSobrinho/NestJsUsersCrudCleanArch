import { Injectable } from "@nestjs/common";
import { UsersService } from "../users.service";
import { UpdateUserDto } from "../dto/updateUser.dto";
import { AuthJWTDto } from "src/auth/dto/authJWT.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UpdateUserUseCase{
  constructor(private usersService : UsersService,
    private configService: ConfigService){}
  async updateUser(id: number,updateUserDto: UpdateUserDto, user : AuthJWTDto) {
    if(user.id != id){
      if(user.permission != 1 && user.permission != 2){
        return {message: 'You do not have permission to perform this action'}
      }
    }
    try{
      const foundId = this.usersService.getUserById(id)
      if(foundId != null){
        if(updateUserDto.password != null){
          updateUserDto.password = await this.cryptPassword(updateUserDto.password)
        }
        await this.usersService.update(id,updateUserDto)
        return {message: 'User updated successfully'}
      }else{
        return {message: 'User not found'}
      }
    }catch{
      return {message: 'Failed to update the user'}
    }
  }
  async cryptPassword(password: string){
    const bcrypt = require('bcrypt');
    const rounds = this.configService.get<string>('BCRYPT_SALT_ROUNDS')
    const secondpass = this.configService.get<string>('BCRYPT_SECOND_TEXT')
    const passwordWithSecondText = password + secondpass;
    const salt = await bcrypt.genSalt(parseInt(rounds));
    const hashedPassword = await bcrypt.hash(passwordWithSecondText, salt);
    return String(hashedPassword)
  }
}