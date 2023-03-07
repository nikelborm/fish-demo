import { Injectable } from '@nestjs/common';
import { sub } from 'date-fns';
import { assertMockScriptNameIsCorrect } from 'src/config';
import { repo, UserUseCase } from 'src/modules';
import { AccessScopeType, SensorParameterValueTypenameEnum } from 'src/types';

@Injectable()
export class MockDataUseCase {
  constructor(
    private readonly abstractSensorRepo: repo.AbstractSensorRepo,
    private readonly abstractSensorToSensorInstanceRepo: repo.AbstractSensorToSensorInstanceRepo,
    private readonly abstractSensorToSensorParameterRepo: repo.AbstractSensorToSensorParameterRepo,
    private readonly accessScopeRepo: repo.AccessScopeRepo,
    private readonly reservoirRepo: repo.ReservoirRepo,
    private readonly sensorInstanceRepo: repo.SensorInstanceRepo,
    private readonly sensorMeasurementRepo: repo.SensorMeasurementRepo,
    private readonly sensorParameterInstanceRepo: repo.SensorParameterInstanceRepo,
    private readonly sensorParameterRepo: repo.SensorParameterRepo,
    private readonly userToAccessScopeRepo: repo.UserToAccessScopeRepo,
    private readonly userUseCase: UserUseCase,
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
    console.log('systemAdminScope: ', systemAdminScope);

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

    console.log('user: ', user);
    const userToAccessScope = await this.userToAccessScopeRepo.createOne({
      accessScopeId: systemAdminScope.id,
      userId: user.id,
    });
    console.log('userToAccessScope: ', userToAccessScope);

    const reservoir = await this.reservoirRepo.createOnePlain({
      name: 'Бассейн №1',
    });
    console.log('reservoir: ', reservoir);

    const sensorInstance = await this.sensorInstanceRepo.createOnePlain({
      reservoirId: reservoir.id,
    });
    console.log('sensorInstance: ', sensorInstance);

    const sensorParameters = await this.sensorParameterRepo.createManyPlain([
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
    ]);
    console.log('sensorParameters: ', sensorParameters);
    const [tempSensorParameter, oxygenSensorParameter, pHSensorParameter] =
      sensorParameters as [
        repo.CreatedOnePlainSensorParameter,
        repo.CreatedOnePlainSensorParameter,
        repo.CreatedOnePlainSensorParameter,
      ];

    const abstractSensor = await this.abstractSensorRepo.createOnePlain({
      modelName: 'CHR 3000',
    });
    console.log('abstractSensor: ', abstractSensor);

    const abstractSensorToSensorParameter =
      await this.abstractSensorToSensorParameterRepo.createMany(
        sensorParameters.map(({ id: sensorParameterId }) => ({
          sensorParameterId,
          abstractSensorId: abstractSensor.id,
        })),
      );
    console.log(
      'abstractSensorToSensorParameter: ',
      abstractSensorToSensorParameter,
    );

    const abstractSensorToSensorInstance =
      await this.abstractSensorToSensorInstanceRepo.createOne({
        abstractSensorId: abstractSensor.id,
        sensorInstanceId: sensorInstance.id,
      });

    console.log(
      'abstractSensorToSensorInstance: ',
      abstractSensorToSensorInstance,
    );
    const sensorParameterInstance =
      await this.sensorParameterInstanceRepo.createManyPlain(
        sensorParameters.map(({ id }) => ({
          sensorParameterId: id,
          abstractSensorId: abstractSensor.id,
          sensorInstanceId: sensorInstance.id,
        })),
      );
    console.log('sensorParameterInstance: ', sensorParameterInstance);
  }

  async fillSensorMeasurements(): Promise<void> {
    await this.sensorMeasurementRepo.createManyPlain(
      this.#getFakeMeasurements(2, 0.5, 2),
    );

    await this.sensorMeasurementRepo.createManyPlain(
      this.#getFakeMeasurements(1, 20, 40),
    );

    await this.sensorMeasurementRepo.createManyPlain(
      this.#getFakeMeasurements(3, 5, 8),
    );
    console.log();
  }

  #getFakeMeasurements(
    sensorParameterInstanceId: number,
    minValue: number,
    maxValue: number,
  ): repo.PlainSensorMeasurementToInsert[] {
    const sinDegrees = (angleDegrees: number): number =>
      Math.sin((angleDegrees * Math.PI) / 180);
    return Array.from({ length: 720 }, (_, i) => i)
      .map(
        (v): repo.PlainSensorMeasurementToInsert => ({
          sensorParameterInstanceId,
          recordedAt: sub(new Date(), { seconds: 720 - v + Math.random() * 3 }),
          value:
            minValue +
            0.8 *
              (((sinDegrees(v + Math.random() * 60) + 1) / 2) *
                (maxValue - minValue) +
                ((maxValue - minValue) / 5) * Math.random()) -
            1 +
            Math.random(),
        }),
      )
      .sort(
        ({ recordedAt: a }, { recordedAt: b }) => a.getTime() - b.getTime(),
      );
  }
}
