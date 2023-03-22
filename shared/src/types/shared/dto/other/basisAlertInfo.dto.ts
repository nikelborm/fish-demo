import { IsNumber } from 'class-validator';

export class BasicAlertInfoDTO {
  @IsNumber()
  reservoir_id!: number;

  @IsNumber()
  alert_type_id!: number;

  @IsNumber()
  importance!: number;
}
