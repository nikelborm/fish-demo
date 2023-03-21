import { PrimaryIdentityColumn } from 'src/tools';
import type { IBehavior } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { BehaviorType } from '.';

@Entity({ name: 'behavior' })
export class Behavior implements IBehavior {
  @PrimaryIdentityColumn('behavior_id')
  id!: number;

  @Column({ name: 'probability', nullable: false })
  probability!: number;

  @Column({ name: 'time', type: 'timestamptz', nullable: false })
  time!: Date;

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

  @ManyToOne(() => BehaviorType, (behaviorType) => behaviorType.behaviors)
  @JoinColumn({ name: 'behavior_type_id' })
  behaviorType!: BehaviorType;

  @Column({
    name: 'behavior_type_id',
    nullable: false,
  })
  behaviorTypeId!: number;
}
