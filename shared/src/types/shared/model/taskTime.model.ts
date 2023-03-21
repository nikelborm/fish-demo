//
import type { ITask } from '.';

export class ITaskTime {
  id!: number;

  daytime!: string;

  deadlineTime!: string;

  dayOfWeek!: number;

  repeatType!: string;

  createdAt!: Date;

  updatedAt!: Date;

  task!: ITask;

  taskId!: number;
}
