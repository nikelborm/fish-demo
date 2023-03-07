import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { groupByKey, insertManyPlain, insertOnePlain } from 'src/tools';
import { ReservoirInfoDTO } from 'src/types';
import { Repository } from 'typeorm';
import { Reservoir, SensorParameterInstance } from '../model';

@Injectable()
export class ReservoirRepo {
  constructor(
    @InjectRepository(Reservoir)
    private readonly repo: Repository<Reservoir>,
  ) {}

  async getReservoirFullInfo(
    reservoirId: number,
  ): Promise<ReservoirInfoDTO | null> {
    const results = await this.repo // сука даже регулярные выражения блять легче сука написать, чем разобраться со всеми багами этого куска говна
      .createQueryBuilder('reservoir') // Как же меня заебала typeorm
      .select([
        'reservoir.id',
        'reservoir.name', // Как же меня заебала typeorm
        'sensorInstances.id',
        'abstractSensor.id',
        'abstractSensor.modelName', // Как же меня заебала typeorm
        'sensor_parameter_instance_sensor_parameter_instance_id', // Как же меня заебала typeorm
        '"sensorParameter_sensor_parameter_id"',
        '"sensorParameter_unit"',
        '"sensorParameter_name"', // Как же меня заебала typeorm
        '"sensorParameter_value_type_name"',
      ])
      .innerJoin('reservoir.sensorInstances', 'sensorInstances') // Как же меня заебала typeorm
      .innerJoin(
        'sensorInstances.abstractSensorToSensorInstance',
        'abstract_sensor_to_sensor_instance', // Как же меня заебала typeorm
      )
      .innerJoin(
        'abstract_sensor_to_sensor_instance.abstractSensor',
        'abstractSensor',
      ) // Как же меня заебала typeorm
      .innerJoin(
        (qb) =>
          qb
            .from(SensorParameterInstance, 'sensor_parameter_instance')
            .addSelect([
              // Как же меня заебала typeorm
              'sensor_parameter_instance.id', // Как же меня заебала typeorm
              'sensor_parameter_instance.sensorInstanceId',
              'sensor_parameter_instance.abstractSensorId',
              // 'sensor_parameter_instance.sensorParameterId',
              'sensorParameter.id',
              'sensorParameter.name', // Как же меня заебала typeorm
              'sensorParameter.unit',
              'sensorParameter.valueTypeName', // Как же меня заебала typeorm
            ])
            .innerJoin(
              'sensor_parameter_instance.sensorParameter', // Как же меня заебала typeorm
              'sensorParameter', // всё это дерьмо из-за всратого бага в typeorm. Как же она мен заебала
            ),
        'sensor_parameter_instance', // Как же меня заебала typeorm
        'abstract_sensor_to_sensor_instance.abstractSensorId = sensor_parameter_instance.sensor_parameter_instance_abstract_sensor_id AND abstract_sensor_to_sensor_instance.sensorInstanceId = sensor_parameter_instance.sensor_parameter_instance_sensor_instance_id', // Как же меня заебала typeorm
      ) // Как же меня заебала typeorm

      .where('reservoir.id = :reservoirId')
      .setParameters({
        // Как же меня заебала typeorm
        reservoirId,
      })
      .getRawMany();
    console.log(
      'results: ',
      JSON.stringify(
        this.#iHateTypeormAndWasForcedWithNoOtherChoiceToWriteThisFuckingRemap(
          results,
        ),
        null,
        4,
      ),
    );

    if (results.length !== 1) return null;
    return (
      this.#iHateTypeormAndWasForcedWithNoOtherChoiceToWriteThisFuckingRemap(
        results,
      )[0] ?? null
    );
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

  #iHateTypeormAndWasForcedWithNoOtherChoiceToWriteThisFuckingRemap(asd2): any {
    const ddd = [...groupByKey(asd2, 'reservoir_reservoir_id').entries()].map(
      ([reservoirId, recordsWithThatReservoirId]) => ({
        id: reservoirId,
        name: recordsWithThatReservoirId[0]!.name,
        sensorInstances: [
          ...groupByKey(
            recordsWithThatReservoirId,
            'sensorInstances_sensor_instance_id',
          ).entries(),
        ].map(([sensorInstanceId, recordsWithThatSensorInstanceId]) => ({
          id: sensorInstanceId,
          abstractSensorToSensorInstance: {
            abstractSensor: {
              id: recordsWithThatSensorInstanceId[0]!
                .abstractSensor_abstract_sensor_id,
              name: recordsWithThatSensorInstanceId[0]!
                .abstractSensor_model_name,
            },
            sensorParameterInstances: [
              ...groupByKey(
                recordsWithThatSensorInstanceId,
                'sensor_parameter_instance_sensor_parameter_instance_id',
              ).entries(),
            ].map(
              ([
                sensorParameterInstanceId,
                recordsWithThatSensorParameterInstanceId,
              ]) => ({
                id: sensorParameterInstanceId,
                sensorParameter: {
                  id: recordsWithThatSensorParameterInstanceId[0]!
                    .sensorParameter_sensor_parameter_id,
                  name: recordsWithThatSensorParameterInstanceId[0]!
                    .sensorParameter_unit,
                  unit: recordsWithThatSensorParameterInstanceId[0]!
                    .sensorParameter_name,
                  valueTypeName:
                    recordsWithThatSensorParameterInstanceId[0]!
                      .sensorParameter_value_type_name,
                },
              }),
            ),
          },
        })),
      }),
    );
    console.log('ddd: ', JSON.stringify(ddd, null, 4));
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
// select: {
//   id: true,
//   name: true,
//   sensorInstances: {
//     id: true,
//     abstractSensorToSensorInstance: {
//       abstractSensorId: true,
//       sensorInstanceId: true,
//       abstractSensor: {
//         id: true,
//         modelName: true,
//       },
//       sensorParameterInstances: {
//         id: true,
//         sensorParameter: {
//           id: true,
//           name: true,
//           unit: true,
//           valueTypeName: true,
//         },
//       },
//     },
//   },
// },
