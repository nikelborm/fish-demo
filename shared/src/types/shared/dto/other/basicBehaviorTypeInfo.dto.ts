import { IsString, MaxLength, MinLength } from 'class-validator';

export class BasicBehaviorTypeInfoDTO {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  description!: string;
}
