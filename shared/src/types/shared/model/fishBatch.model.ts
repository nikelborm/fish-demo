import type { IFishKind } from '.';

export class IFishBatch {
  id!: number;

  name!: string;

  fishKindId!: number;

  fishKind!: IFishKind;

  createdAt!: Date;

  updatedAt!: Date;
}
