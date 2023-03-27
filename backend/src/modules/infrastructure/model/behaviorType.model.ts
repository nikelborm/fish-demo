import { PrimaryIdentityColumn } from 'src/tools';
import type { IBehaviorType, IFishInfo } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Behavior, FishInfo } from '.';

@Entity({ name: 'behavior_type' })
export class BehaviorType implements IBehaviorType {
  @PrimaryIdentityColumn('behavior_type_id')
  id!: number;

  @Column({
    name: 'name',
    nullable: false,
    unique: true,
  })
  name!: string;

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

  @OneToMany(() => Behavior, (behavior) => behavior.behaviorType)
  behaviors!: Behavior[];

  @OneToOne(() => FishInfo, (fishInfo) => fishInfo.behaviorType)
  @JoinColumn({
    name: 'fish_info_id',
  })
  fishInfo!: IFishInfo;
}
