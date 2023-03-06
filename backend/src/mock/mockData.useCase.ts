import { Injectable } from '@nestjs/common';
import { assertMockScriptNameIsCorrect } from 'src/config';
import { repo, UserUseCase } from 'src/modules';
import { CreatedPlainEntity } from 'src/tools';
import {
  AccessScopeType,
  SensorParameterValueTypenameEnum,
  ISensorParameter,
} from 'src/types';

@Injectable()
export class MockDataUseCase {
  constructor(
    private readonly userUseCase: UserUseCase,
    private readonly userToAccessScopeRepo: repo.UserToAccessScopeRepo,
    private readonly accessScopeRepo: repo.AccessScopeRepo,
    private readonly sensorMeasurementRepo: repo.SensorMeasurementRepo,
    private readonly reservoirRepo: repo.ReservoirRepo,
    private readonly sensorParameterRepo: repo.SensorParameterRepo,
    private readonly abstractSensorRepo: repo.AbstractSensorRepo,
    private readonly abstractSensorToSensorInstanceRepoRepo: repo.AbstractSensorToSensorInstanceRepo,
    private readonly abstractSensorToSensorParameterRepoRepo: repo.AbstractSensorToSensorParameterRepo,
    private readonly sensorInstanceRepo: repo.SensorInstanceRepo,
  ) {}

  async executeMock(scriptName?: string): Promise<void> {
    assertMockScriptNameIsCorrect(scriptName);

    console.log(`\n\n\nFILLING STARTED: ${scriptName}\n`);

    await this[scriptName]();

    console.log('\nDATABASE FILLED SUCCESSFULLY\n\n\n');
  }

  async fillDBScript(): Promise<void> {
    console.log('fillDBScript called');

    const systemAdminScope = await this.accessScopeRepo.createOneWithRelations({
      type: AccessScopeType.SYSTEM_ADMIN,
    });

    const { user } = await this.userUseCase.createUser({
      email: 'asd@asd.asd',
      lastName: 'Такой-тов',
      firstName: 'Такой-то',
      patronymic: 'Такой-тович',
      nickname: 'asdasdasd',
      avatarURL: 'http://google.com',
      gender: 'male',
      password: 'asdasdasd',
    });

    await this.userToAccessScopeRepo.createOne({
      accessScopeId: systemAdminScope.id,
      userId: user.id,
    });

    const reservoir = await this.reservoirRepo.createOne({
      name: 'Бассейн №1',
    });

    const sensorInstance = await this.sensorInstanceRepo.createOne({
      reservoirId: reservoir.id,
    });

    const sensors = (await this.sensorParameterRepo.createManyPlain([
      {
        name: 'Температура',
        shortName: 'T',
        valueTypeName: SensorParameterValueTypenameEnum.NUMBER,
        unit: '°C',
      },
      {
        name: 'Кислород',
        shortName: 'o2',
        valueTypeName: SensorParameterValueTypenameEnum.NUMBER,
        unit: '%',
      },
      {
        name: 'Кислотность',
        shortName: 'pH',
        valueTypeName: SensorParameterValueTypenameEnum.NUMBER,
        unit: '',
      },
    ])) as unknown as [
      CreatedPlainEntity<ISensorParameter, 'id'>,
      CreatedPlainEntity<ISensorParameter, 'id'>,
      CreatedPlainEntity<ISensorParameter, 'id'>,
    ];
    const [tempSensorParameter, oxygenSensorParameter, pHSensorParameter] =
      sensors;

    const abstractSensor = await this.abstractSensorRepo.createOnePlain({
      modelName: 'CHR 3000',
    });

    await this.abstractSensorToSensorParameterRepoRepo.createMany(
      sensors.map(({ id: sensorParameterId }) => ({
        sensorParameterId,
        abstractSensorId: abstractSensor.id,
      })),
    );

    await this.abstractSensorToSensorInstanceRepoRepo.createOne({
      abstractSensorId: abstractSensor.id,
      sensorInstanceId: sensorInstance.id,
    });
  }

  async fillSensorMeasurements(): Promise<void> {
    // await this.sensorMeasurementRepo.createMany(
    //   this.#getFakeMeasurements('O2', 0.5, 2),
    // );

    // await this.sensorMeasurementRepo.createMany(
    //   this.#getFakeMeasurements('Temp', 20, 40),
    // );
    console.log();
  }

  // #getFakeMeasurements(
  //   sensorParameterInstanceId: number,
  //   minValue: number,
  //   maxValue: number,
  // ): Parameters<repo.SensorMeasurementRepo['createMany']>[0] {
  //   const sinDegrees = (angleDegrees: number): number =>
  //     Math.sin((angleDegrees * Math.PI) / 180);
  //   return Array.from({ length: 720 }, (_, i) => i)
  //     .map(
  //       (v): CreateSensorMeasurementDTO => ({
  //         sensorParameterInstanceId,
  //         recordedAt: sub(new Date(), { seconds: 720 - v + Math.random() * 3 }),
  //         value: {
  //           __typename: SensorParameterValueTypenameEnum.NUMBER,
  //           value:
  //             minValue +
  //             0.8 *
  //               (((sinDegrees(v + Math.random() * 60) + 1) / 2) *
  //                 (maxValue - minValue) +
  //                 ((maxValue - minValue) / 5) * Math.random()) -
  //             1 +
  //             Math.random(),
  //         },
  //       }),
  //     )
  //     .sort(
  //       ({ recordedAt: a }, { recordedAt: b }) => a.getTime() - b.getTime(),
  //     );
  // }
}
