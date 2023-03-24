import { PrimaryIdentityColumn } from 'src/tools';
import type { IReservoir } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { FishBatch, SensorInstance } from '.';
import { Task, TaskToReservoir } from '.';

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
  fish_count!: number;

  @Column({
    name: 'fish_batch_id',
    nullable: false,
  })
  fishBatchId!: number;

  @ManyToOne(() => FishBatch, (fishBatch) => fishBatch.reservoirs)
  @JoinColumn({ name: 'fish_batch_id' })
  fishBatch!: FishBatch;

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
}
