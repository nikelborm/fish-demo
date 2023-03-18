import type { IFishBatch } from '.';

export class IFishKind {
  id!: number;

  name!: string;

  description!: string;

  fishBatches?: IFishBatch[];

  createdAt!: Date;

  updatedAt!: Date;
}
