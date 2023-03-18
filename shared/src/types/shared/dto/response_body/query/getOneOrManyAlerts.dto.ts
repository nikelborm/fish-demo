import { IsPositive } from 'class-validator';
import { IsDateConverted, NestedArrayDTO } from '../../../../../tools/shared';

export class GetOneAlertByIdResponseDTO {
  @IsPositive()
  id!: number;

  @IsDateConverted()
  createdAt!: Date;

  @IsDateConverted()
  updatedAt!: Date;
}

export class FindManyAlertsResponseDTO {
  @NestedArrayDTO(() => GetOneAlertByIdResponseDTO)
  alerts!: GetOneAlertByIdResponseDTO[];
}
