import { NestedArrayDTO, NestedDTO } from 'src/tools';
import { BasicAlertTypeInfoWithIdDTO } from '../../other/basicAlertTypeInfoWithId.dto';

export class CreateOneAlertTypeResponse {
  @NestedDTO(() => BasicAlertTypeInfoWithIdDTO)
  alertType!: BasicAlertTypeInfoWithIdDTO;
}

export class CreateManyAlertTypesResponseDTO {
  @NestedArrayDTO(() => BasicAlertTypeInfoWithIdDTO)
  createdAlertTypes!: BasicAlertTypeInfoWithIdDTO[];
}
