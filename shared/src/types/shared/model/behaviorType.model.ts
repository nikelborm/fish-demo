//
import type { IBehavior } from '.';

export class IBehaviorType {
  id!: number;

  name!: string;

  description!: string;

  createdAt!: Date;

  updatedAt!: Date;

  behaviors!: IBehavior[];
}
