import { IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

export class UpdateOneBehaviorTypeResponse {
  @IsOptional()
  @IsPositive()
  id?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
