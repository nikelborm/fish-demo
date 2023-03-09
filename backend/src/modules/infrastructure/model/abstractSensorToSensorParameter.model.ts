import type { IAbstractSensorToSensorParameter } from 'src/types';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { SensorParameter, AbstractSensor, SensorParameterInstance } from '.';

@Entity({ name: 'abstract_sensor_to_sensor_parameter' })
export class AbstractSensorToSensorParameter
  implements IAbstractSensorToSensorParameter
{
  @ManyToOne(
    () => AbstractSensor,
    (abstractSensor) => abstractSensor.abstractSensorToSensorParameterRelations,
  )
  @JoinColumn({ name: 'abstract_sensor_id' })
  abstractSensor!: AbstractSensor;

  @Column({
    name: 'abstract_sensor_id',
    primary: true,
    nullable: false,
  })
  abstractSensorId!: number;

  @ManyToOne(
    () => SensorParameter,
    (sensorParameter) =>
      sensorParameter.abstractSensorToSensorParameterRelations,
  )
  @JoinColumn({ name: 'sensor_parameter_id' })
  sensorParameter!: SensorParameter;

  @Column({
    name: 'sensor_parameter_id',
    primary: true,
    nullable: false,
  })
  sensorParameterId!: number;

  @OneToMany(
    () => SensorParameterInstance,
    (sensorParameterInstance) =>
      sensorParameterInstance.abstractSensorToSensorParameter,
  )
  sensorParameterInstances!: SensorParameterInstance[];
}
