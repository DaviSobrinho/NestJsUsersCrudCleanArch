import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GetUserDto } from "src/users/dto/getUser.dto";
import { UsersService } from "src/users/users.service";
import { LoginDto } from "../dto/login.dto";
import { AuthJWTDto } from "../dto/authJWT.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LoginUseCase{
  constructor(private usersService : UsersService,
    private configService: ConfigService,
    private jwtService: JwtService){}
  async login(loginDto: LoginDto)  {
    try{
        const user = await this.usersService.getUserByEmail(loginDto.email)
        if(user != null){
            const validCredentials = await this.comparePassword(loginDto.password,user.password)
            if(validCredentials){
                const payload = {id: user.id, email: user.email, permission: user.id_permission}
                return {
                    access_token: await this.jwtService.signAsync(payload),
                  };
            }else{
                return {message: 'Invalid password'}
            }
        }else{
            return {message: 'There is no user with this email'}
        }
    }catch{
        return {message: 'Failed to retrieve the user'}
    }
  }
  private async comparePassword(password: string, hashedPassword){
    const bcrypt = require('bcrypt');
    const secondpass = this.configService.get<string>('BCRYPT_SECOND_TEXT')
    const passwordWithSecondText = password + secondpass;
    const isMatch = await bcrypt.compare(passwordWithSecondText, hashedPassword);
    return (isMatch)
  }
}