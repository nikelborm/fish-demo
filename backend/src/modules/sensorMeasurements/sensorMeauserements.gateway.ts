// eslint-disable-next-line max-classes-per-file
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { IsNotEmpty, MinLength } from 'class-validator';
import { UseWSMessageValidationPipe } from 'src/tools';
import { SensorMeasurementUseCase } from './sensorMeasurement.useCase';

export class MessageDTO {
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  @MinLength(10)
  text!: string;
}

@WebSocketGateway({ namespace: '/sensorMeasurement' })
export class SensorMeasurementWSGateway {
  constructor(
    private readonly sensorMeasurementUseCase: SensorMeasurementUseCase,
  ) {}

  @UseWSMessageValidationPipe()
  @SubscribeMessage('asd')
  async handleEvent2(@MessageBody() data: MessageDTO): Promise<string> {
    console.log('data: ', data);
    await this.sensorMeasurementUseCase.findManyWith({ sensorCodeName: 'O2' });
    return 'a';
  }
}
