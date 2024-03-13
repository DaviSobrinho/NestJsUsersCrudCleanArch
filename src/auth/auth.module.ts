import { Global, Inject, Module, SetMetadata, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { LoginUseCase } from './use-case/login.use-case';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { PrismaUserRepository } from 'src/users/repository/prisma-user.repository';
import { PrismaClient } from '@prisma/client';

@Global()
@Module({
  imports: [
    forwardRef(() =>UsersModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: 300
        },
        global: true,}),
      inject: [ConfigService],
    }),],
  controllers: [AuthController],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },LoginUseCase, UsersService, ConfigService, PrismaUserRepository,PrismaClient],
  exports: [AuthService]
})
export class AuthModule {}
