import { IsString } from 'class-validator';

export class CreateAlertTypeDTO {
  @IsString()
  description!: string;
}
