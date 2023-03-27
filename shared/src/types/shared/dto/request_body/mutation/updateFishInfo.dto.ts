import { IsNumber, IsPositive, IsString, MaxLength } from 'class-validator';

export class UpdateFishInfoDTO {
  @IsPositive()
  id!: number;

  @IsString()
  name!: string;

  @IsString()
  @MaxLength(255)
  description!: string;

  @IsPositive()
  @IsNumber()
  behavior_id!: number;
}
