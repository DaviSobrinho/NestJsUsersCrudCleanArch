import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaUserRepository } from './repository/prisma-user.repository';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { GetAllUsersUseCase } from './use-case/get-all-users.use-case';
import { PrismaClient } from '@prisma/client';
import { UpdateUserUseCase } from './use-case/update-user.use-case';
import { DeleteUserUseCase } from './use-case/delete-user.use-case';
import { GetUserByIdUseCase } from './use-case/get-user-by-id.use-case';
import { GetUserByCPFCase } from './use-case/get-user-by-cpf.use-case';
import { GetUserByEmailUseCase } from './use-case/get-user-by-email.use-case';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { DecodeTokenUseCase } from 'src/auth/use-case/decode-token.use-case';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[forwardRef(() =>AuthModule)],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [ConfigService, UsersService,PrismaService, PrismaUserRepository, CreateUserUseCase, GetAllUsersUseCase,PrismaClient,UpdateUserUseCase,DeleteUserUseCase,GetUserByIdUseCase,GetUserByCPFCase,GetUserByEmailUseCase, DecodeTokenUseCase,JwtService],
})
export class UsersModule {}
