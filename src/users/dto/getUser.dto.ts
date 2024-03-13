import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUser.dto';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUserDto {
    id : number;
    name : string;
    cpf : string;
    email : string;
    password : string;
    createdAt: string;
    updatedAt: string;
    id_permission : number;
    flg_active: boolean
}
