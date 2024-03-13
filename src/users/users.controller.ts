import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { GetAllUsersUseCase } from './use-case/get-all-users.use-case';
import { GetUserByIdUseCase } from './use-case/get-user-by-id.use-case';
import { UpdateUserUseCase } from './use-case/update-user.use-case';
import { DeleteUserUseCase } from './use-case/delete-user.use-case';
import { Public } from 'src/auth/validator/public-routes.validator';
import { AuthService } from 'src/auth/auth.service';
import { DecodeTokenUseCase } from 'src/auth/use-case/decode-token.use-case';
import { JwtService } from '@nestjs/jwt';
import { AuthJWTDto } from 'src/auth/dto/authJWT.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly decodeTokenUseCase: DecodeTokenUseCase,
    private readonly jwtService: JwtService) {
    }
  @Public()  
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.createUserUseCase.createUser(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllUsers(@Request() req) {
    return this.getAllUsersUseCase.getAllUsers(req.user);
  }
  
  @UseGuards(AuthGuard)
  @Get('/:id')
  async getUser(@Param('id') id: number,@Request() req) {
    return this.getUserByIdUseCase.getUserById(+id,req.user);
  }
  
  @UseGuards(AuthGuard)
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto,@Request() req) {
    return this.updateUserUseCase.updateUser(+id, updateUserDto,req.user);
  }
  
  @UseGuards(AuthGuard)
  @Delete('/:id')
  async remove(@Param('id') id: number,@Request() req) {
    return this.deleteUserUseCase.deleteUser(+id,req.user);
  }
}
