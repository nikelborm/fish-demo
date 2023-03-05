import { PrimaryIdentityColumn } from 'src/tools';
import { ISensorParameterInstance } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import {
  AbstractSensorToSensorInstance,
  AbstractSensorToSensorParameter,
} from '.';

@Entity({ name: 'sensor_parameter_instance' })
@Unique('UQ_sensor_parameter_instance_keys', [
  'sensorParameterId',
  'sensorInstanceId',
])
export class SensorParameterInstance implements ISensorParameterInstance {
  @PrimaryIdentityColumn('sensor_parameter_instance_id')
  id!: number;

  @ManyToOne(
    () => AbstractSensorToSensorParameter,
    (abstractSensorToSensorParameter) =>
      abstractSensorToSensorParameter.sensorParameterInstances,
  )
  @JoinColumn([
    { name: 'abstract_sensor_id', referencedColumnName: 'abstractSensorId' },
    { name: 'sensor_parameter_id', referencedColumnName: 'sensorParameterId' },
  ])
  abstractSensorToSensorParameter!: AbstractSensorToSensorParameter;

  @ManyToOne(
    () => AbstractSensorToSensorInstance,
    (abstractSensorToSensorInstance) =>
      abstractSensorToSensorInstance.sensorParameterInstances,
  )
  @JoinColumn([
    { name: 'abstract_sensor_id', referencedColumnName: 'abstractSensorId' },
    { name: 'sensor_instance_id', referencedColumnName: 'sensorInstanceId' },
  ])
  abstractSensorToSensorInstance!: AbstractSensorToSensorInstance;

  @Column({
    name: 'abstract_sensor_id',
    nullable: false,
  })
  abstractSensorId!: number;

  @Column({
    name: 'sensor_parameter_id',
    nullable: false,
  })
  sensorParameterId!: number;

  @Column({
    name: 'sensor_instance_id',
    nullable: false,
  })
  sensorInstanceId!: number;

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
