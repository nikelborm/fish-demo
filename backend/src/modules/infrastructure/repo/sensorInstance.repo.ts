import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SensorInstance } from '../model';

@Injectable()
export class SensorInstanceRepo {
  constructor(
    @InjectRepository(SensorInstance)
    private readonly repo: Repository<SensorInstance>,
  ) {}

  async getAll(): Promise<SensorInstance[]> {
    return await this.repo.find();
  }

  async createOnePlain(
    newSensorInstance: Pick<SensorInstance, PlainKeysAllowedToModify>,
  ): Promise<
    Pick<
      SensorInstance,
      PlainKeysAllowedToModify | PlainKeysGeneratedAfterInsert
    >
  > {
    const createdSensorInstance = await this.repo.insert(newSensorInstance);
    console.log('createdSensorInstance: ', createdSensorInstance);
    createdSensorInstance;
    return {} as any;
  }

  async createManyPlain(
    newSensorInstances: Pick<SensorInstance, PlainKeysAllowedToModify>[],
  ): Promise<
    Pick<
      SensorInstance,
      PlainKeysAllowedToModify | PlainKeysGeneratedAfterInsert
    >[]
  > {
    const createdSensorInstances = await this.repo.insert(newSensorInstances);
    console.log('createdSensorInstances: ', createdSensorInstances);
    createdSensorInstances;
    return {} as any;
  }
}

type PlainKeysGeneratedAfterInsert = 'id' | 'createdAt' | 'updatedAt';

type PlainKeysAllowedToModify = 'reservoirId';
