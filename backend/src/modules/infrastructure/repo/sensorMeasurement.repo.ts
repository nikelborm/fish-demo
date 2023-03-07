import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { insertManyPlain, insertOnePlain } from 'src/tools';
import { FindSensorMeasurementsDTO } from 'src/types';
import { Between, Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { SensorMeasurement } from '../model';

@Injectable()
export class SensorMeasurementRepo {
  constructor(
    @InjectRepository(SensorMeasurement)
    private readonly repo: Repository<SensorMeasurement>,
  ) {}

  async getAll(): Promise<Pick<SensorMeasurement, UsuallyReturnedPlainKeys>[]> {
    return await this.repo.find({
      order: { recordedAt: 'desc' },
    });
  }

  async getLatestMeasurementsWhereSensorInstanceHas(
    reservoirId: number,
  ): Promise<Pick<SensorMeasurement, UsuallyReturnedPlainKeys>[]> {
    return await this.repo
      .createQueryBuilder('sensorMeasurement')
      .select([
        'sensorMeasurement.id',
        'sensorMeasurement.sensorParameterInstanceId',
        'sensorMeasurement.recordedAt',
        'sensorMeasurement.value',
      ])
      .distinctOn(['sensorMeasurement.sensorParameterInstanceId'])
      .innerJoin(
        'sensorMeasurement.sensorParameterInstance',
        'sensorParameterInstance',
      )
      .innerJoin('sensorParameterInstance.sensorInstance', 'sensorInstance')
      .where('sensorInstance.reservoirId = :reservoirId')
      .orderBy('sensorMeasurement.sensorParameterInstanceId', 'DESC')
      .addOrderBy('sensorMeasurement.recordedAt', 'DESC')
      .addOrderBy('sensorMeasurement.id', 'DESC')
      .setParameters({
        reservoirId,
      })
      .getMany();
  }

  async findManyWith({
    reservoirId,
    maxDate,
    minDate,
  }: FindSensorMeasurementsDTO): Promise<
    Omit<SensorMeasurement, 'sensorParameterInstance'>[]
  > {
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

  async createOnePlain(
    newSensorMeasurement: Pick<SensorMeasurement, PlainKeysAllowedToModify>,
  ): Promise<CreatedOnePlainSensorMeasurement> {
    return await insertOnePlain<CreatedOnePlainSensorMeasurement>(
      this.repo,
      newSensorMeasurement,
    );
  }

  async createManyPlain(
    newSensorMeasurements: Pick<SensorMeasurement, PlainKeysAllowedToModify>[],
  ): Promise<CreatedOnePlainSensorMeasurement[]> {
    return await insertManyPlain<CreatedOnePlainSensorMeasurement>(
      this.repo,
      newSensorMeasurements,
    );
  }
}

type PrimaryKeys = 'id';
type PlainKeysGeneratedAfterInsert = PrimaryKeys;

type UsuallyReturnedPlainKeys =
  | PrimaryKeys
  | 'recordedAt'
  | 'value'
  | 'sensorParameterInstanceId';

type PlainKeysAllowedToModify =
  | 'recordedAt'
  | 'value'
  | 'sensorParameterInstanceId';

export type PlainSensorMeasurementToInsert = Pick<
  SensorMeasurement,
  PlainKeysAllowedToModify
>;

export type CreatedOnePlainSensorMeasurement = Pick<
  SensorMeasurement,
  PlainKeysAllowedToModify | PlainKeysGeneratedAfterInsert
>;
