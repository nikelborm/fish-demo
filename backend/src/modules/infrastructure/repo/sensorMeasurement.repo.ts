import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  createManyWithRelations,
  createOneWithRelations,
  NewPlainEntity,
} from 'src/tools';
import { FindSensorMeasurementsDTO } from 'src/types';
import { Between, Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { SensorMeasurement } from '../model';

@Injectable()
export class SensorMeasurementRepo {
  constructor(
    @InjectRepository(SensorMeasurement)
    private readonly repo: Repository<SensorMeasurement>,
  ) {}

  async getAll(): Promise<SensorMeasurement[]> {
    return await this.repo.find({ order: { recordedAt: 'desc' } });
  }

  async getAllPossibleSensors(): Promise<string[]> {
    return (
      await this.repo
        .createQueryBuilder('sensorMeasurement')
        .select('sensorMeasurement.sensorCodeName', 'sensor')
        .distinct(true)
        .getRawMany()
    ).map(({ sensor }) => sensor);
  }

  async getLatestForEachSensor(): Promise<SensorMeasurement[]> {
    return await this.repo
      .createQueryBuilder('sensorMeasurement')
      .innerJoin(
        'sensorMeasurement.sensorParameterInstance',
        'sensorParameterInstance',
      )
      .select([
        'sensorMeasurement.id',
        'sensorMeasurement.sensorCodeName',
        'sensorMeasurement.date',
        'sensorMeasurement.value',
      ])
      .distinctOn(['sensorMeasurement.sensorCodeName'])
      .orderBy('sensorMeasurement.sensorCodeName', 'DESC')
      .addOrderBy('sensorMeasurement.date', 'DESC')
      .addOrderBy('sensorMeasurement.id', 'DESC')
      .getMany();

    // SELECT DISTINCT ON (sensor_code_name)
    //        sensor_measurement_id, sensor_code_name, date,  value
    // FROM   sensor_measurement
    // ORDER  BY sensor_code_name, date DESC, sensor_measurement_id DESC;
  }

  async findManyWith({
    reservoirId,
    maxDate,
    minDate,
  }: FindSensorMeasurementsDTO): Promise<SensorMeasurement[]> {
    return await this.repo.find({
      order: { recordedAt: 'desc' },
      select: {
        id: true,
        recordedAt: true,
        value: true,
        sensorParameterInstanceId: true,
      },
      where: {
        sensorParameterInstance: {
          sensorInstance: {
            reservoirId,
          },
        },
        ...(minDate && maxDate && { recordedAt: Between(minDate, maxDate) }),
        ...(minDate && !maxDate && { recordedAt: MoreThanOrEqual(minDate) }),
        ...(!minDate && maxDate && { recordedAt: LessThanOrEqual(maxDate) }),
      },
      relations: {
        sensorParameterInstance: {
          sensorInstance: true,
        },
      },
    });
  }

  async createOne(
    newSensorMeasurement: NewPlainEntity<SensorMeasurement, 'id'>,
  ): Promise<SensorMeasurement> {
    return (await createOneWithRelations(
      this.repo,
      newSensorMeasurement,
    )) as SensorMeasurement;
  }

  async createMany(
    newSensorMeasurements: NewPlainEntity<SensorMeasurement, 'id'>[],
  ): Promise<SensorMeasurement[]> {
    return (await createManyWithRelations(
      this.repo,
      newSensorMeasurements,
    )) as SensorMeasurement[];
  }
}
