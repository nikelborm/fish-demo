import { PrimaryIdentityColumn } from 'src/tools';
import { ISensorInstance } from 'src/types';
import { CreateDateColumn, Entity, OneToOne, UpdateDateColumn } from 'typeorm';
import { AbstractSensorToSensorInstance } from '.';

@Entity({ name: 'sensor_instance' })
export class SensorInstance implements ISensorInstance {
  @PrimaryIdentityColumn('sensor_instance_id')
  id!: number;

  @OneToOne(
    () => AbstractSensorToSensorInstance,
    (abstractSensorToSensorInstance) =>
      abstractSensorToSensorInstance.sensorInstance,
  )
  abstractSensorToSensorInstance!: AbstractSensorToSensorInstance[];

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
