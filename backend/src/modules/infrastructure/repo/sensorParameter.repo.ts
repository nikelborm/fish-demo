import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SensorParameter } from '../model';

@Injectable()
export class SensorParameterRepo {
  constructor(
    @InjectRepository(SensorParameter)
    private readonly repo: Repository<SensorParameter>,
  ) {}

  async getAll(): Promise<SensorParameter[]> {
    return await this.repo.find();
  }

  async createOnePlain(
    newSensorParameter: Pick<SensorParameter, PlainKeysAllowedToModify>,
  ): Promise<CreatedOnePlainSensorParameter> {
    const createdSensorParameter = await this.repo.insert(newSensorParameter);
    console.log('createdSensorParameter: ', createdSensorParameter);
    createdSensorParameter;
    return {} as any;
  }

  async createManyPlain(
    newSensorParameters: Pick<SensorParameter, PlainKeysAllowedToModify>[],
  ): Promise<CreatedOnePlainSensorParameter[]> {
    const createdSensorParameters = await this.repo.insert(newSensorParameters);
    console.log('createdSensorParameters: ', createdSensorParameters);
    createdSensorParameters;
    return {} as any;
  }
}

type PlainKeysGeneratedAfterInsert = 'id' | 'createdAt' | 'updatedAt';

type PlainKeysAllowedToModify = 'name' | 'unit' | 'shortName' | 'valueTypeName';

export type CreatedOnePlainSensorParameter = Pick<
  SensorParameter,
  PlainKeysAllowedToModify | PlainKeysGeneratedAfterInsert
>;
