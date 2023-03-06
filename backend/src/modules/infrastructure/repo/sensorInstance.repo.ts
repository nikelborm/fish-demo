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
    newSensorInstance: Pick<SensorInstance, 'reservoirId'>,
  ): Promise<
    Pick<SensorInstance, 'reservoirId' | 'id' | 'createdAt' | 'updatedAt'>
  > {
    const createdSensorInstance = await this.repo.insert(newSensorInstance);
    console.log('createdSensorInstance: ', createdSensorInstance);
    createdSensorInstance;
    return {} as any;
  }

  async createManyPlain(
    newSensorInstances: Pick<SensorInstance, 'reservoirId'>[],
  ): Promise<
    Pick<SensorInstance, 'reservoirId' | 'id' | 'createdAt' | 'updatedAt'>[]
  > {
    const createdSensorInstances = await this.repo.insert(newSensorInstances);
    console.log('createdSensorInstances: ', createdSensorInstances);
    createdSensorInstances;
    return {} as any;
  }
}
