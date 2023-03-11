import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetOneEventTypeByIdResponseDTO {
  @IsNumber()
  id!: number;

  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
