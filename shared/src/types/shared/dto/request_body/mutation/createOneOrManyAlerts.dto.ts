import { IsPositive } from 'class-validator';
import { NestedArrayDTO } from '../../../../../tools/shared';

export class CreateOneAlertRequestDTO {
  @IsPositive()
  reservoir_id!: number;

  @IsPositive()
  alert_type_id!: number;

  @IsPositive()
  importance!: number;
}

export class CreateManyAlertsRequestDTO {
  @NestedArrayDTO(() => CreateOneAlertRequestDTO)
  alerts!: CreateOneAlertRequestDTO[];
}
