import { IsPositive } from 'class-validator';
import { BasicEventInfoDTO } from './basicEventInfo.dto';

export class BasicEventInfoWithIdDTO extends BasicEventInfoDTO {
  @IsPositive()
  id!: number;
}
