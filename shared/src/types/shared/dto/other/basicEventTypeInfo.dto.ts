import { IsOptional, IsString, MaxLength } from 'class-validator';

export class BasicEventTypeInfoDTO {
  @IsString()
  name!: string;

  @IsString()
  @MaxLength(255)
  description!: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
