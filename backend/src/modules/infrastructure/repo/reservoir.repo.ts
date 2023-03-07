import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { insertManyPlain, insertOnePlain } from 'src/tools';
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
    newReservoir: Pick<Reservoir, PlainKeysAllowedToModify>,
  ): Promise<CreatedOnePlainReservoir> {
    return await insertOnePlain<CreatedOnePlainReservoir>(
      this.repo,
      newReservoir,
    );
  }

  async createManyPlain(
    newReservoirs: Pick<Reservoir, PlainKeysAllowedToModify>[],
  ): Promise<CreatedOnePlainReservoir[]> {
    return await insertManyPlain<CreatedOnePlainReservoir>(
      this.repo,
      newReservoirs,
    );
  }

  async updateOnePlain({
    id,
    ...existingReservoir
  }: Pick<
    Reservoir,
    PrimaryKeys | PlainKeysAllowedToModify
  >): Promise<UpdatedPlainReservoir> {
    const updatedReservoir = await this.repo.update(id, existingReservoir);
    console.log('updatedReservoir: ', updatedReservoir);
    updatedReservoir;
    return {} as any;
  }

  async updateManyPlain(
    existingReservoirs: Pick<
      Reservoir,
      PrimaryKeys | PlainKeysAllowedToModify
    >[],
  ): Promise<UpdatedPlainReservoir[]> {
    const updatedReservoirs = await this.repo.save(existingReservoirs);
    console.log('updatedReservoirs: ', updatedReservoirs);
    updatedReservoirs;
    return {} as any;
  }
}

type PrimaryKeys = 'id';

type PlainKeysGeneratedAfterInsert = PrimaryKeys | 'createdAt' | 'updatedAt';

type PlainKeysAllowedToModify = 'name';

export type CreatedOnePlainReservoir = Pick<
  Reservoir,
  PlainKeysAllowedToModify | PlainKeysGeneratedAfterInsert
>;

export type UpdatedPlainReservoir = Pick<
  Reservoir,
  PrimaryKeys | PlainKeysAllowedToModify
>;
