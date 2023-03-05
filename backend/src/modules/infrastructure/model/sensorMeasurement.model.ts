import { PrimaryIdentityColumn } from 'src/tools';
import { ISensorMeasurement, SensorParameterValueType } from 'src/types';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { SensorParameterInstance } from './sensorParameterInstance.model';

@Entity({ name: 'sensor_measurement' })
export class SensorMeasurement implements ISensorMeasurement {
  @PrimaryIdentityColumn('sensor_measurement_id', { type: 'bigint' })
  id!: number;

  @Column({
    name: 'recorded_at_date',
    nullable: false,
    type: 'timestamptz',
  })
  recordedAt!: Date;

  @Column({
    name: 'value',
    nullable: false,
    type: 'jsonb',
  })
  value!: SensorParameterValueType;

  @ManyToOne(
    () => SensorParameterInstance,
    (sensorParameterInstance) => sensorParameterInstance.sensorMeasurements,
  )
  @JoinColumn({ name: 'sensor_parameter_instance_id' })
  sensorParameterInstance!: SensorParameterInstance;

  @Column({
    name: 'sensor_parameter_instance_id',
    nullable: false,
  })
  sensorParameterInstanceId!: number;
}
