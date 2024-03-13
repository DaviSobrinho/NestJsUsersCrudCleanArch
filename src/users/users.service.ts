import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { PrismaUserRepository } from './repository/prisma-user.repository';

@Injectable()
export class UsersService {
  constructor(private prismaUserRepository : PrismaUserRepository){}
  async create(createUserDto: CreateUserDto) {
    return await this.prismaUserRepository.create(createUserDto)
  }

  async getAllUsers() {
    return await this.prismaUserRepository.readAll()
  }

  async getUserById(id: number) {
    return await this.prismaUserRepository.readOneById(id)
  }

  async getUserByCPF(cpf: string) {
    return await this.prismaUserRepository.readOneByCPF(cpf)
  }

  async getUserByEmail(email: string)  {
    return await this.prismaUserRepository.readOneByEmail(email)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prismaUserRepository.update(id,updateUserDto)
  }

  async remove(id: number) {
    return await this.prismaUserRepository.delete(id)
  }
}
