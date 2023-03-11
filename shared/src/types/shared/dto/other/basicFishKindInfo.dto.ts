import { IsOptional, IsString, MaxLength } from 'class-validator';

export class BasicFishKindInfoDTO {
  @IsString()
  name!: string;

  @IsString()
  @MaxLength(255)
  description!: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
