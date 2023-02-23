import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UseWSMessageValidationPipe } from 'src/tools';
import { SensorMeasurementUseCase } from './sensorMeasurement.useCase';

// @WebSocketGateway({ namespace: 'sensorMeasurement' })
@WebSocketGateway()
export class SensorMeasurementWSGateway {
  @WebSocketServer()
  server;

  constructor(
    private readonly sensorMeasurementUseCase: SensorMeasurementUseCase,
  ) {}

  @UseWSMessageValidationPipe()
  @SubscribeMessage('events')
  async handleEvent(@MessageBody() data: string): Promise<string> {
    console.log('data: ', data);
    await this.sensorMeasurementUseCase.findManyWith({ sensorCodeName: 'O2' });
    return data;
  }

  @UseWSMessageValidationPipe()
  @SubscribeMessage('asd')
  async handleEvent2(@MessageBody() data: string): Promise<string> {
    console.log('server: ', this.server);
    console.log('data: ', data);
    await this.sensorMeasurementUseCase.findManyWith({ sensorCodeName: 'O2' });
    return data;
  }
}
