import type { IFishBatch, ISensorInstance, ITask, ITaskToReservoir } from '.';

export class IReservoir {
  id!: number;

  sensorInstances!: ISensorInstance[];

  name!: string;

  fishBatchId!: number;

  fishBatch!: IFishBatch;

  createdAt!: Date;

  updatedAt!: Date;

  tasksWithThatReservoir!: ITask[];

  taskToReservoirRelations!: ITaskToReservoir[];
}
