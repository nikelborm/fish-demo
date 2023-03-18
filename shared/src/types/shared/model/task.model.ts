//
import type { ITaskTime } from '.';

export class ITask {
  id!: number;

  type!: string;

  icon!: string;

  description!: string;

  createdAt!: Date;

  updatedAt!: Date;

  taskTimes!: ITaskTime[];
}
