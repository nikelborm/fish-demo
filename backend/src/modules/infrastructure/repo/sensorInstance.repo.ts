import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { insertManyPlain, insertOnePlain } from 'src/tools';
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
  ): Promise<CreatedOnePlainSensorInstance> {
    return await insertOnePlain<CreatedOnePlainSensorInstance>(
      this.repo,
      newSensorInstance,
    );
  }

  async createManyPlain(
    newSensorInstances: Pick<SensorInstance, PlainKeysAllowedToModify>[],
  ): Promise<CreatedOnePlainSensorInstance[]> {
    return await insertManyPlain<CreatedOnePlainSensorInstance>(
      this.repo,
      newSensorInstances,
    );
  }
}

type PlainKeysGeneratedAfterInsert = 'id' | 'createdAt' | 'updatedAt';

type PlainKeysAllowedToModify = 'reservoirId';

type CreatedOnePlainSensorInstance = Pick<
  SensorInstance,
  PlainKeysAllowedToModify | PlainKeysGeneratedAfterInsert
>;
