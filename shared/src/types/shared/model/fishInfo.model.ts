//

import { IBehaviorType } from './behaviorType.model';

export class IFishInfo {
  id!: number;

  name!: string;

  description!: string;

  behavior_id!: number;

  createdAt!: Date;

  updatedAt!: Date;

  behaviorType!: IBehaviorType[];
}
