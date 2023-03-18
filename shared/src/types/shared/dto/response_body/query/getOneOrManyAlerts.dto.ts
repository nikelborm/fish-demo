import { IsPositive } from 'class-validator';
import { IsDateConverted, NestedArrayDTO } from '../../../../../tools/shared';

export class GetOneAlertByIdResponseDTO {
  @IsPositive()
  id!: number;

  @IsPositive()
  reservoir_id!: number;

  @IsPositive()
  alert_type_id!: number;

  @IsPositive()
  importance!: number;

  @IsDateConverted()
  createdAt!: Date;

  @IsDateConverted()
  updatedAt!: Date;
}

export class FindManyAlertsResponseDTO {
  @NestedArrayDTO(() => GetOneAlertByIdResponseDTO)
  alerts!: GetOneAlertByIdResponseDTO[];
}
