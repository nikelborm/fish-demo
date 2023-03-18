//
import type { IReservoir, ITaskToReservoir, ITaskTime } from '.';

export class ITask {
  id!: number;

  type!: string;

  icon!: string;

  description!: string;

  createdAt!: Date;

  updatedAt!: Date;

  taskTimes!: ITaskTime[];

  reservoirs!: IReservoir[];

  taskToReservoirRelations!: ITaskToReservoir[];
}
