import { NestedDTO } from '../../../../../tools/shared';
import { BasicEventInfoWithIdDTO } from '../../other/basicEventInfoWithId.dto';

export class CreateOneEventResponseDTO {
  @NestedDTO(() => BasicEventInfoWithIdDTO)
  Event!: BasicEventInfoWithIdDTO;
}
