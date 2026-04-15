import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Van, User } from '@app/entities';
import { DatabaseSeeder } from './database.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([User, Van])],
  providers: [DatabaseSeeder],
})
export class DatabaseModule {}
