import { NestedArrayDTO, NestedDTO } from '../../../../../tools/shared';
import { BasicBehaviorTypeInfoWithIdDTO } from '../../other/basicBehaviorTypeInfoWithId.dto';

export class CreateOneBehaviorTypeResponse {
  @NestedDTO(() => BasicBehaviorTypeInfoWithIdDTO)
  BehaviorType!: BasicBehaviorTypeInfoWithIdDTO;
}

export class CreateManyBehaviorTypesResponseDTO {
  @NestedArrayDTO(() => BasicBehaviorTypeInfoWithIdDTO)
  createdBehaviorTypes!: BasicBehaviorTypeInfoWithIdDTO[];
}
