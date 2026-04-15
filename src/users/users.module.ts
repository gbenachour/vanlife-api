import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Van } from '../entities';
import { AuthService } from '@app/auth/auth.service';
import { CurrentUserInterceptor } from '../common/interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { VansService } from '@app/vans/vans.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Van])],
  controllers: [UsersController],
  providers: [
    UsersService,
    VansService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
