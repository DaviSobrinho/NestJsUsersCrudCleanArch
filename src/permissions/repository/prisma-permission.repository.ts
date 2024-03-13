import { Permission, PrismaClient, User } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { UpdatePermissionDto } from "../dto/update-permission.dto";
import { CreatePermissionDto } from "../dto/create-permission.dto";

@Injectable()
export class PrismaPermissionRepository{
    constructor(private readonly prisma : PrismaClient){}
    async create (createPermissionDto : CreatePermissionDto) : Promise<void>{
        await this.prisma.permission.create({
            data: {
                permission: createPermissionDto.permission,
                flgActive: createPermissionDto.flg_active
            }
        })
    }
    async readOneById(id: number): Promise<Permission> {
        return await this.prisma.permission.findUnique({
            where: {
                id: id
            }
        });
    }
    async readOneByPermission(permission: string): Promise<Permission> {
        return await this.prisma.permission.findUnique({
            where: {
                permission: permission
            }
        });
    }
    async update (id : number, updatePermissionDto : UpdatePermissionDto) : Promise<void>{
        await this.prisma.permission.update({
            where:{
                id: id
            },
            data: {
                permission: updatePermissionDto.permission,
                flgActive: updatePermissionDto.flg_active
            }
        })
    }
    async delete(id: number): Promise<void> {
        await this.prisma.permission.delete({
            where: {
                id: id
            }
        });
    }
    async readAll(): Promise<Permission[]> {
        return await this.prisma.permission.findMany({
        });
    }
}