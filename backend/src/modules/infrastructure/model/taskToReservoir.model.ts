import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Reservoir, Task } from '.';
import type { ITaskToReservoir } from 'src/types';
import { User } from '.';

@Entity({ name: 'task_to_reservoir' })
export class TaskToReservoir implements ITaskToReservoir {
  @ManyToOne(() => Task, (task) => task.taskToReservoirRelations)
  @JoinColumn({ name: 'task_id' })
  task!: Task;

  @Column({
    name: 'task_id',
    primary: true,
    nullable: false,
  })
  taskId!: number;

  @ManyToOne(() => Reservoir, (reservoir) => reservoir.taskToReservoirRelations)
  @JoinColumn({ name: 'reservoir_id' })
  reservoir!: Reservoir;

  @Column({
    name: 'reservoir_id',
    primary: true,
    nullable: false,
  })
  reservoirId!: number;

  @ManyToOne(() => User, (user) => user.taskToReservoirs)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({
    name: 'user_id',
    nullable: false,
  })
  userId!: number;
}
