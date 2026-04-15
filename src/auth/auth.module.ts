import { Module } from '@nestjs/common';
import { UsersService } from '@app/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities';
import { AuthService } from '@app/auth/auth.service';
import { CurrentUserInterceptor } from '../common/interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    UsersService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
