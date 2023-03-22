import { IsNumber } from 'class-validator';

export class CreateAlertDTO {
  @IsNumber()
  alert_type_id!: number;

  @IsNumber()
  reservoir_id!: number;

  @IsNumber()
  importance!: number;
}
