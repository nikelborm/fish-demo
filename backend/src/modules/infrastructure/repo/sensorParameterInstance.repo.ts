import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { insertManyPlain, insertOnePlain } from 'src/tools';
import { Repository } from 'typeorm';
import { SensorParameterInstance } from '../model';

@Injectable()
export class SensorParameterInstanceRepo {
  constructor(
    @InjectRepository(SensorParameterInstance)
    private readonly repo: Repository<SensorParameterInstance>,
  ) {}

  async getAll(): Promise<SensorParameterInstance[]> {
    return await this.repo.find();
  }

  async getAllWithParameters(): Promise<SensorParameterInstance[]> {
    return await this.repo.find({
      relations: {
        sensorParameter: true,
      },
    });
  }

  async createOnePlain(
    newSensorParameterInstance: Pick<
      SensorParameterInstance,
      PlainKeysAllowedToModify
    >,
  ): Promise<CreatedOnePlainSensorParameterInstance> {
    return await insertOnePlain<CreatedOnePlainSensorParameterInstance>(
      this.repo,
      newSensorParameterInstance,
    );
  }

  async createManyPlain(
    newSensorParameterInstances: Pick<
      SensorParameterInstance,
      PlainKeysAllowedToModify
    >[],
  ): Promise<CreatedOnePlainSensorParameterInstance[]> {
    return await insertManyPlain<CreatedOnePlainSensorParameterInstance>(
      this.repo,
      newSensorParameterInstances,
    );
  }
}

type PlainKeysGeneratedAfterInsert = 'id' | 'createdAt' | 'updatedAt';

type PlainKeysAllowedToModify =
  | 'sensorParameterId'
  | 'abstractSensorId'
  | 'sensorInstanceId';

export type CreatedOnePlainSensorParameterInstance = Pick<
  SensorParameterInstance,
  PlainKeysAllowedToModify | PlainKeysGeneratedAfterInsert
>;
