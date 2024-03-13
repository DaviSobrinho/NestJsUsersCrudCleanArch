import { Body, Controller, Post, Put } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginUseCase } from './use-case/login.use-case';
import { Public } from './validator/public-routes.validator';

@Controller('auth')
export class AuthController {
    constructor(private loginUseCase : LoginUseCase){
    }
    @Post()
    @Public()
    async login(@Body() loginDto: LoginDto) {
        return await this.loginUseCase.login(loginDto);
    }
}
