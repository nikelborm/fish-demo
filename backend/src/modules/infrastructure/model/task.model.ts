import { PrimaryIdentityColumn } from 'src/tools';
import type { ITask } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { TaskTime } from '.';
import { Reservoir, TaskToReservoir } from '.';

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

  @ManyToMany(() => Reservoir, (reservoir) => reservoir.tasksWithThatReservoir)
  @JoinTable({
    name: 'task_to_reservoir',
    joinColumn: { name: 'task_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'reservoir_id', referencedColumnName: 'id' },
    // synchronize is important flag! Without it your migrations will have two conflicting declarations for question_to_category table
    // from https://github.com/typeorm/typeorm/blob/master/docs/decorator-reference.md#jointable
    synchronize: false,
  })
  reservoirs!: Reservoir[];

  @OneToMany(() => TaskToReservoir, (taskToReservoir) => taskToReservoir.task)
  taskToReservoirRelations!: TaskToReservoir[];
}
