import { IsPositive } from 'class-validator';
import { BasicAlertInfoDTO } from './basisAlertInfo.dto';

export class BasicAlertInfoWithIdDTO extends BasicAlertInfoDTO {
  @IsPositive()
  id!: number;
}
