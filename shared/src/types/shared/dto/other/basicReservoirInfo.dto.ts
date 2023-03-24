import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class BasicReservoirInfoDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(128)
  name!: string;

  @IsNumber()
  fishCount!: number;

  @IsNumber()
  fishBatchId!: number;
}
