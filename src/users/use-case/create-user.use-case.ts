import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/createUser.dto";
import { UsersService } from "../users.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CreateUserUseCase{
  constructor(private usersService : UsersService,
    private configService: ConfigService){}
  async createUser(createUserDto: CreateUserDto) {
    try{
      const foundCPF = await this.usersService.getUserByCPF(createUserDto.cpf)
      if(foundCPF != null){
        return ({message: 'The cpf is already beeing used'})
      }
    }catch{
      return ({message: 'Failed to verify the cpf'})
    }
    try{
      const foundEmail = await this.usersService.getUserByEmail(createUserDto.email)
      if(foundEmail != null){
        return ({message: 'The email is already beeing used'})
      }
    }catch{
      return ({message: 'Failed to verify the cpf'})
    }
    createUserDto.password = await this.cryptPassword(createUserDto.password)
    await this.usersService.create(createUserDto)
    return {message: 'User created successfully'}
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