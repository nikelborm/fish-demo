//
import type { IBehaviorType, IReservoir } from '.';

export class IBehavior {
  id!: number;

  createdAt!: Date;

  updatedAt!: Date;

  behaviorType!: IBehaviorType;

  behaviorTypeId!: number;

  reservoirId!: number;

  probability!: number;

  reservoir!: IReservoir;

  time!: Date;
}
