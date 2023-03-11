import {
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class UpdateEventTypeDTO {
  @IsPositive()
  id!: number;

  @IsString()
  @MinLength(1)
  @MaxLength(128)
  name!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  description!: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
