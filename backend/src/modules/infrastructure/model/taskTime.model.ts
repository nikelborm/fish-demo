import { PrimaryIdentityColumn } from 'src/tools';
import type { ITaskTime } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from '.';

@Entity({ name: 'task_time' })
export class TaskTime implements ITaskTime {
  @PrimaryIdentityColumn('task_time_id')
  id!: number;

  @Column({
    name: 'daytime',
    nullable: false,
  })
  daytime!: string;

  @Column({
    name: 'deadline_time',
    nullable: false,
  })
  deadlineTime!: string;

  @Column({
    name: 'day_of_week',
    nullable: false,
  })
  dayOfWeek!: number;

  @Column({
    name: 'repeat_type',
    nullable: false,
  })
  repeatType!: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt!: Date;

  @ManyToOne(() => Task, (task) => task.taskTimes)
  @JoinColumn({ name: 'task_id' })
  task!: Task;

  @Column({
    name: 'task_id',
    nullable: false,
  })
  taskId!: number;
}
