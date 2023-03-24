import { PrimaryIdentityColumn } from 'src/tools';
import type { IReservoir } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Behavior, SensorInstance } from '.';
import { Task, TaskToReservoir } from '.';
import { Event } from '.';

@Entity({ name: 'reservoir' })
export class Reservoir implements IReservoir {
  @PrimaryIdentityColumn('reservoir_id')
  id!: number;

  @Column({
    name: 'name',
    nullable: false,
  })
  name!: string;

  @Column({
    name: 'fish_count',
    type: 'int',
  })
  fishCount!: number;

  @Column({
    name: 'fish_batch_id',
    type: 'int',
  })
  fishBatchId!: number;

  @OneToMany(() => SensorInstance, (sensorInstance) => sensorInstance.reservoir)
  sensorInstances!: SensorInstance[];

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

  @ManyToMany(() => Task, (task) => task.reservoirs)
  tasksWithThatReservoir!: Task[];

  @OneToMany(
    () => TaskToReservoir,
    (taskToReservoir) => taskToReservoir.reservoir,
  )
  taskToReservoirRelations!: TaskToReservoir[];

  @OneToMany(() => Event, (event) => event.reservoir)
  events!: Event[];

  @OneToMany(() => Behavior, (behavior) => behavior.reservoir)
  behaviors!: Behavior[];
}
