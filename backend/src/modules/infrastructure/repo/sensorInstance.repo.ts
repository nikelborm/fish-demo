import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreatedEntity,
  createManyWithRelations,
  createOneWithRelations,
  NewEntity,
} from 'src/tools';
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

  async createOneWithRelations(
    newSensorInstance: NewEntity<SensorInstance, 'id'>,
  ): Promise<CreatedEntity<SensorInstance, 'id'>> {
    return await createOneWithRelations(this.repo, newSensorInstance);
  }

  async createManyWithRelations(
    newSensorInstances: NewEntity<SensorInstance, 'id'>[],
  ): Promise<CreatedEntity<SensorInstance, 'id'>[]> {
    return await createManyWithRelations(this.repo, newSensorInstances);
  }
}
