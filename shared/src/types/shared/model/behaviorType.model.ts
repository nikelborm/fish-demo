//
import type { IBehavior, IFishInfo } from '.';

export class IBehaviorType {
  id!: number;

  name!: string;

  description!: string;

  createdAt!: Date;

  updatedAt!: Date;

  behaviors!: IBehavior[];

  fishInfo!: IFishInfo;
}
