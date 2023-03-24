import {
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateReservoirDTO {
  @IsPositive()
  id!: number;

  @IsString()
  @MinLength(3)
  @MaxLength(128)
  name!: string;

  @IsNumber()
  fishCount!: number;

  @IsNumber()
  fishBatchId!: number;
}
