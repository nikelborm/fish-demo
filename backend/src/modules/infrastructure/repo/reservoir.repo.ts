import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservoirInfoDTO } from 'src/types';
import { Repository } from 'typeorm';
import { Reservoir } from '../model';

@Injectable()
export class ReservoirRepo {
  constructor(
    @InjectRepository(Reservoir)
    private readonly repo: Repository<Reservoir>,
  ) {}

  async getReservoirFullInfo(
    reservoirId: number,
  ): Promise<ReservoirInfoDTO | null> {
    return await this.repo.findOne({
      where: { id: reservoirId },
      select: {
        id: true,
        name: true,
        sensorInstances: {
          id: true,
          abstractSensorToSensorInstance: {
            abstractSensor: {
              id: true,
              modelName: true,
            },
            sensorParameterInstances: {
              id: true,
              sensorParameter: {
                id: true,
                name: true,
                unit: true,
                valueTypeName: true,
              },
            },
          },
        },
      },
      relations: {
        sensorInstances: {
          abstractSensorToSensorInstance: {
            abstractSensor: true,
            sensorParameterInstances: {
              sensorParameter: true,
            },
          },
        },
      },
    });
  }

  async createOnePlain(
    newReservoir: Pick<Reservoir, 'name'>,
  ): Promise<Pick<Reservoir, 'id' | 'name' | 'createdAt' | 'updatedAt'>> {
    const createdReservoir = await this.repo.insert(newReservoir);
    console.log('createdReservoir: ', createdReservoir);
    createdReservoir;
    return {} as any;
  }

  async createManyPlain(
    newReservoirs: Pick<Reservoir, 'name'>[],
  ): Promise<Pick<Reservoir, 'id' | 'name' | 'createdAt' | 'updatedAt'>[]> {
    const createdReservoirs = await this.repo.insert(newReservoirs);
    console.log('createdReservoirs: ', createdReservoirs);
    createdReservoirs;
    return {} as any;
  }
}
