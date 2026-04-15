import { IsEmail, IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsNumber()
  id!: string;
}
