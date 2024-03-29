import { PrimaryIdentityColumn } from 'src/tools';
import type { IFishBatch } from 'src/types';
import {
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { FishKind, Reservoir } from '.';

@Entity({ name: 'fish_batch' })
export class FishBatch implements IFishBatch {
  @PrimaryIdentityColumn('fish_batch_id')
  id!: number;

  @Column({
    name: 'name',
    nullable: false,
  })
  name!: string;

  @Column({
    name: 'fish_kind_id',
    nullable: false,
  })
  fishKindId!: number;

  @OneToMany(() => Reservoir, (reservoir) => reservoir.fishBatch)
  reservoirs!: Reservoir[];

  @ManyToOne(() => FishKind, (fishKind) => fishKind.fishBatches)
  @JoinColumn({ name: 'fish_kind_id' })
  fishKind!: FishKind;

  @Column({
    name: 'age',
    nullable: false,
  })
  age!: number;

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
