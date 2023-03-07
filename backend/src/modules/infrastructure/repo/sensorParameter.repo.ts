import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { insertManyPlain, insertOnePlain } from 'src/tools';
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
    return await insertOnePlain<CreatedOnePlainSensorParameter>(
      this.repo,
      newSensorParameter,
    );
  }

  async createManyPlain(
    newSensorParameters: Pick<SensorParameter, PlainKeysAllowedToModify>[],
  ): Promise<CreatedOnePlainSensorParameter[]> {
    return await insertManyPlain<CreatedOnePlainSensorParameter>(
      this.repo,
      newSensorParameters,
    );
  }
}

type PlainKeysGeneratedAfterInsert = 'id' | 'createdAt' | 'updatedAt';

type PlainKeysAllowedToModify = 'name' | 'unit' | 'shortName' | 'valueTypeName';

export type CreatedOnePlainSensorParameter = Pick<
  SensorParameter,
  PlainKeysAllowedToModify | PlainKeysGeneratedAfterInsert
>;
