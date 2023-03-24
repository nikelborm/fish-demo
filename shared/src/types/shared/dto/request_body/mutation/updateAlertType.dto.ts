import { IsPositive, IsString, MaxLength } from 'class-validator';

export class UpdateAlertTypeDTO {
  @IsPositive()
  id!: number;

  @IsString()
  @MaxLength(255)
  description!: string;
}
