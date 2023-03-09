import { PrimaryIdentityColumn } from 'src/tools';
import type { IFishKind } from 'src/types';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'fish_kind' })
export class FishKind implements IFishKind {
  @PrimaryIdentityColumn('fish_kind_id')
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

  @Column({
    name: 'icon',
    nullable: true,
  })
  icon!: string;

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
