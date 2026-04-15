import { IsIn, IsInt, IsString, IsUrl, Min, MinLength } from 'class-validator';
import { type VanType } from '@app/entities/van.entity';

const VAN_TYPES: VanType[] = ['simple', 'rugged', 'luxury'];

export class CreateVanDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsInt()
  @Min(1)
  price!: number;

  @IsString()
  @MinLength(10)
  description!: string;

  @IsUrl()
  imageUrl!: string;

  @IsIn(VAN_TYPES)
  type!: VanType;
}
