import type { ISensorInstance, ITask, ITaskToReservoir } from '.';

export class IReservoir {
  id!: number;

  sensorInstances!: ISensorInstance[];

  name!: string;

  fishBatchId!: number;

  fishCount!: number;

  createdAt!: Date;

  updatedAt!: Date;

  tasksWithThatReservoir!: ITask[];

  taskToReservoirRelations!: ITaskToReservoir[];
}
