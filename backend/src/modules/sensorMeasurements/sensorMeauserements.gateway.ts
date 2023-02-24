// eslint-disable-next-line max-classes-per-file
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { IsNotEmpty, MinLength } from 'class-validator';
import { UseWSMessageValidationPipe } from 'src/tools';
import { repo } from '../infrastructure';
import { Socket } from 'socket.io';
import { SensorMeasurementUseCase } from './sensorMeasurement.useCase';

export class MessageDTO {
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  @MinLength(10)
  text!: string;
}

@WebSocketGateway({ namespace: '/sensorMeasurement' })
export class SensorMeasurementWSGateway implements OnGatewayConnection {
  constructor(
    private readonly sensorMeasurementUseCase: SensorMeasurementUseCase,
    private readonly sensorMeasurementRepo: repo.SensorMeasurementRepo,
  ) {}

  async handleConnection(client: Socket): Promise<void> {
    const sensors = await this.sensorMeasurementRepo.getAllPossibleSensors();

    await Promise.all(
      sensors.map((sensor) => client.join(`newSensorMeasurement{${sensor}}`)),
    );
    // console.log('client: any, ...args: ', client, args);
  }

  @UseWSMessageValidationPipe()
  @SubscribeMessage('asd')
  async handleEvent2(@MessageBody() data: MessageDTO): Promise<string> {
    console.log('data: ', data);
    await this.sensorMeasurementUseCase.findManyWith({ sensorCodeName: 'O2' });
    return 'a';
  }
}
