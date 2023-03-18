import { PrimaryIdentityColumn } from 'src/tools';
import type { ITask } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { TaskTime } from '.';

@Entity({ name: 'task' })
export class Task implements ITask {
  @PrimaryIdentityColumn('task_id')
  id!: number;

  @Column({
    name: 'type',
    nullable: false,
  })
  type!: string;

  @Column({
    name: 'icon',
    nullable: false,
  })
  icon!: string;

  @Column({
    name: 'description',
    nullable: false,
  })
  description!: string;

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

  @OneToMany(() => TaskTime, (taskTime) => taskTime.task)
  taskTimes!: TaskTime[];
}
