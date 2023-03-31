import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class GetOneFishInfoByIdResponseDTO {
  @IsNumber()
  id!: number;

  @IsString()
  name!: string;

  @IsNumber()
  behavior_id!: number;

  @IsString()
  description!: string;

  @Type(() => Date)
  @IsDate()
  createdAt!: Date;

  @Type(() => Date)
  @IsDate()
  updatedAt!: Date;
}
