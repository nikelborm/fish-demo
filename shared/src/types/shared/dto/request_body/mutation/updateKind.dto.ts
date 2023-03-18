import { IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

export class UpdateFishKindDTO {
  @IsPositive()
  id!: number;

  @IsString()
  name!: string;

  @IsString()
  @MaxLength(255)
  description!: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
