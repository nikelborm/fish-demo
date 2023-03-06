import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractSensor } from '../model';

@Injectable()
export class AbstractSensorRepo {
  constructor(
    @InjectRepository(AbstractSensor)
    private readonly repo: Repository<AbstractSensor>,
  ) {}

  async getAll(): Promise<AbstractSensor[]> {
    return await this.repo.find();
  }

  async createOnePlain(
    newAbstractSensor: Pick<AbstractSensor, 'modelName'>,
  ): Promise<
    Pick<AbstractSensor, 'modelName' | 'id' | 'createdAt' | 'updatedAt'>
  > {
    const createdAbstractSensor = await this.repo.insert(newAbstractSensor);
    console.log('createdAbstractSensor: ', createdAbstractSensor);
    createdAbstractSensor;
    return {} as any;
  }

  async createManyPlain(
    newAbstractSensors: Pick<AbstractSensor, 'modelName'>[],
  ): Promise<
    Pick<AbstractSensor, 'modelName' | 'id' | 'createdAt' | 'updatedAt'>[]
  > {
    const createdAbstractSensor = await this.repo.insert(newAbstractSensors);
    console.log('createdAbstractSensor: ', createdAbstractSensor);
    createdAbstractSensor;
    return {} as any;
  }
}
