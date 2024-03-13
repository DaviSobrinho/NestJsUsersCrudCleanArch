import { PrismaClient, User } from "@prisma/client";
import { CreateUserDto } from "../dto/createUser.dto";
import { GetUserDto } from "../dto/getUser.dto";
import { UpdateUserDto } from "../dto/updateUser.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUserRepository{
    constructor(private readonly prisma : PrismaClient){}
    async create (createUserDto :CreateUserDto){
        await this.prisma.user.create({
            data: {
                cpf: createUserDto.cpf,
                name: createUserDto.name,
                email: createUserDto.email,
                password: createUserDto.password,
                id_permission: createUserDto.id_permission,
                flgActive: createUserDto.flg_active
            }
        })
    }
    async readOneById(id: number): Promise<User> {
        return await this.prisma.user.findUnique({
            where: {
                id: id
            }
        });
    }
    async readOneByEmail(email: string): Promise<User> {
        return await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });
    }
    async readOneByCPF(cpf: string): Promise<User> {
        return await this.prisma.user.findUnique({
            where: {
                cpf: cpf
            }
        });
    }
    async update (id : number, updateUserDTO : UpdateUserDto) : Promise<void>{
        await this.prisma.user.update({
            where:{
                id: id
            },
            data: {
                cpf: updateUserDTO.cpf,
                name: updateUserDTO.name,
                email: updateUserDTO.email,
                password: updateUserDTO.password,
                id_permission: updateUserDTO.id_permission,
                flgActive: updateUserDTO.flg_active
            }
        })
    }
    async delete(id: number): Promise<void> {
        await this.prisma.user.delete({
            where: {
                id: id
            }
        });
    }
    async readAll(): Promise<User[]> {
        return await this.prisma.user.findMany({
        });
    }
}