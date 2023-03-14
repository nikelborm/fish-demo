import { IsPositive, IsString, MaxLength, MinLength } from 'class-validator';
export class UpdateBehaviorTypeDTO {
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
}
