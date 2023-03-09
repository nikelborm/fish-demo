import type { IAbstractSensorToSensorInstance } from 'src/types';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { SensorInstance, AbstractSensor, SensorParameterInstance } from '.';

@Entity({ name: 'abstract_sensor_to_sensor_instance' })
export class AbstractSensorToSensorInstance
  implements IAbstractSensorToSensorInstance
{
  @ManyToOne(
    () => AbstractSensor,
    (abstractSensor) => abstractSensor.abstractSensorToSensorInstanceRelations,
  )
  @JoinColumn({ name: 'abstract_sensor_id' })
  abstractSensor!: AbstractSensor;

  @Column({
    name: 'abstract_sensor_id',
    primary: true,
    nullable: false,
  })
  abstractSensorId!: number;

  @OneToOne(
    () => SensorInstance,
    (sensorInstance) => sensorInstance.abstractSensorToSensorInstance,
  )
  @JoinColumn({ name: 'sensor_instance_id' })
  sensorInstance!: SensorInstance;

  @Column({
    name: 'sensor_instance_id',
    primary: true,
    unique: true,
    nullable: false,
  })
  sensorInstanceId!: number;

  @OneToMany(
    () => SensorParameterInstance,
    (sensorParameterInstance) =>
      sensorParameterInstance.abstractSensorToSensorInstance,
  )
  sensorParameterInstances!: SensorParameterInstance[];
}
