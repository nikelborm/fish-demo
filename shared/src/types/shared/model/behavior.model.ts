//
import type { IBehaviorType } from '.';

export class IBehavior {
  id!: number;

  createdAt!: Date;

  updatedAt!: Date;

  behaviorType!: IBehaviorType;

  behaviorTypeId!: number;

  probability!: number;

  time!: Date;
}
