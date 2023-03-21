import type { IReservoir, ITask, IUser } from '.';

export class ITaskToReservoir {
  task!: ITask;

  taskId!: number;

  reservoir!: IReservoir;

  reservoirId!: number;

  user!: IUser;

  userId!: number;
}
