import { PrimaryIdentityColumn } from 'src/tools';
import { ISensorParameterInstance } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import {
  AbstractSensor,
  AbstractSensorToSensorInstance,
  AbstractSensorToSensorParameter,
  SensorInstance,
  SensorMeasurement,
  SensorMeasurementConstraint,
  SensorParameter,
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

  @ManyToOne(
    () => SensorInstance,
    (sensorInstance) => sensorInstance.sensorParameterInstances,
    { createForeignKeyConstraints: false },
  )
  @JoinColumn({ name: 'sensor_instance_id' })
  sensorInstance!: SensorInstance;

  @Column({
    name: 'sensor_instance_id',
    nullable: false,
  })
  sensorInstanceId!: number;

  @ManyToOne(
    () => AbstractSensor,
    (abstractSensor) => abstractSensor.sensorParameterInstances,
  )
  @JoinColumn({ name: 'abstract_sensor_id' })
  abstractSensor!: AbstractSensor;

  @Column({
    name: 'abstract_sensor_id',
    nullable: false,
  })
  abstractSensorId!: number;

  @ManyToOne(
    () => SensorParameter,
    (sensorParameter) => sensorParameter.sensorParameterInstances,
    { createForeignKeyConstraints: false },
  )
  @JoinColumn({ name: 'sensor_parameter_id' })
  sensorParameter!: SensorParameter;

  @Column({
    name: 'sensor_parameter_id',
    nullable: false,
  })
  sensorParameterId!: number;

  @OneToMany(
    () => SensorMeasurement,
    (sensorMeasurement) => sensorMeasurement.sensorParameterInstance,
  )
  sensorMeasurements!: SensorMeasurement[];

  @OneToMany(
    () => SensorMeasurementConstraint,
    (sensorMeasurementConstraint) =>
      sensorMeasurementConstraint.sensorParameterInstance,
  )
  sensorMeasurementConstraints!: SensorMeasurementConstraint[];

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
