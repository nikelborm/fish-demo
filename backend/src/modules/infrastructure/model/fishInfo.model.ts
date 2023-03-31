import { PrimaryIdentityColumn } from 'src/tools';
import type { IFishInfo } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { BehaviorType } from './behaviorType.model';

@Entity({ name: 'fish_info' })
export class FishInfo implements IFishInfo {
  @PrimaryIdentityColumn('fish_info_id')
  id!: number;

  @Column({
    name: 'name',
    nullable: false,
    unique: true,
  })
  name!: string;

  @Column({
    name: 'behavior_id',
    nullable: false,
  })
  behavior_id!: number;

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

  @OneToOne(() => BehaviorType, (behaviorType) => behaviorType.fishInfo)
  behaviorType!: BehaviorType[];
}
