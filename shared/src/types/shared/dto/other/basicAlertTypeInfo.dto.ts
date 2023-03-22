import { IsString, MaxLength, MinLength } from 'class-validator';

export class BasicAlertTypeInfoDTO {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  description!: string;
}
