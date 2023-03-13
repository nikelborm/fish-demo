import { PrimaryIdentityColumn } from 'src/tools';
import type { IBehaviorType } from 'src/types';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'behavior_type' })
export class BehaviorType implements IBehaviorType {
  @PrimaryIdentityColumn('behavior_type_id')
  id!: number;

  @Column({
    name: 'name',
    nullable: false,
    unique: true,
    type: 'string',
  })
  name!: string;

  @Column({
    name: 'description',
    nullable: false,
    type: 'string',
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
}
