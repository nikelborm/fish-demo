import { IsPositive } from 'class-validator';
import { BasicEventInfoDTO } from './basicEventInfo.dto';

export class BasicEventInfoWithIdDTO extends BasicEventInfoDTO {
  @IsPositive()
  event_id!: number;
}
