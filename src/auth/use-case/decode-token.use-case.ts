import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthJWTDto } from "../dto/authJWT.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class DecodeTokenUseCase{
    constructor(private jwtService: JwtService){}
    
    async decodeTokenUseCase(token) {
        try {
            token.header.authorization = token.split(' ')[1];
            const decodedToken = await this.jwtService.decode(token);
            const { id, email, permission } = decodedToken as AuthJWTDto;
            
            return new AuthJWTDto(id, email, permission);
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}