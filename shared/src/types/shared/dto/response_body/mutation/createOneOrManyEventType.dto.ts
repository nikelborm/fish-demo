import { NestedArrayDTO, NestedDTO } from '../../../../../tools/shared';
import { BasicEventTypeInfoWithIdDTO } from '../../other/basicEventTypeInfoWithId.dto';

export class CreateOneEventTypeResponse {
  @NestedDTO(() => BasicEventTypeInfoWithIdDTO)
  EventType!: BasicEventTypeInfoWithIdDTO;
}

export class CreateManyEventTypesResponseDTO {
  @NestedArrayDTO(() => BasicEventTypeInfoWithIdDTO)
  createdEventTypes!: BasicEventTypeInfoWithIdDTO[];
}
