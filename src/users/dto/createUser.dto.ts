import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsCPF } from "../validator/cpf.validator";

export class CreateUserDto {
    @IsString()
    name : string;
    @IsString()
    @IsCPF({message: 'The cpf is not valid'})
    cpf : string;
    @IsString()
    @IsEmail()
    email : string;
    @IsString()
    password : string;
    @IsNumber()
    id_permission : number;
    @IsBoolean()
    flg_active : boolean;
}
