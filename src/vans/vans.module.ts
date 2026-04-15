import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersModule } from '../users/users.module';
import { Van } from '@app/entities/van.entity';
import { VansController } from './vans.controller';
import { VansService } from './vans.service';
import { UsersService } from '@app/users/users.service';
import { User } from '@app/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Van, User])],
  controllers: [VansController],
  providers: [VansService, UsersService],
  exports: [VansService],
})
export class VansModule {}
