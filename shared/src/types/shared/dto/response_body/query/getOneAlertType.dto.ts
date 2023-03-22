import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class GetOneAlertTypeByIdResponseDTO {
  @IsNumber()
  id!: number;

  @IsString()
  description!: string;

  @Type(() => Date)
  @IsDate()
  createdAt!: Date;

  @Type(() => Date)
  @IsDate()
  updatedAt!: Date;
}
