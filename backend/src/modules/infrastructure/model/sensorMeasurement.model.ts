import { PrimaryIdentityColumn } from 'src/tools';
import { ISensorMeasurement } from 'src/types';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'sensor_measurement' })
export class SensorMeasurement implements ISensorMeasurement {
  @PrimaryIdentityColumn('sensor_measurement_id')
  id!: number;

  @Column({
    name: 'sensor_code_name',
    nullable: false,
    type: 'varchar',
    length: 5,
  })
  sensorCodeName!: string;

  @Column({
    name: 'date',
    nullable: false,
    type: 'timestamptz',
  })
  date!: Date;

  @Column({
    name: 'value',
    nullable: false,
    transformer: {
      from(raw: string): number {
        return parseFloat(raw);
      },
      to(norRaw: number): string {
        return norRaw.toString();
      },
    },
    type: 'numeric',
  })
  value!: number;
}
