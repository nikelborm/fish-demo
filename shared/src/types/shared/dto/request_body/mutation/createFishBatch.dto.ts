import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateFishBatchDTO {
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  name!: string;

  @IsNumber()
  fishKindId!: number;

  @IsNumber()
  age!: number;
}
