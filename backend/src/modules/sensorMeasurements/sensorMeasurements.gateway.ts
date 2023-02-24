import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { groupBy } from 'src/tools';
import { repo } from '../infrastructure';
import { Server, Socket } from 'socket.io';
import { ISensorMeasurement } from 'src/types';

@WebSocketGateway({ namespace: '/sensorMeasurement' })
export class SensorMeasurementWSGateway implements OnGatewayConnection {
  constructor(
    private readonly sensorMeasurementRepo: repo.SensorMeasurementRepo,
  ) {}

  @WebSocketServer()
  server!: Server;

  broadcastManyNew(sensorMeasurements: ISensorMeasurement[]): void {
    Object.entries(
      groupBy<'sensorCodeName', ISensorMeasurement>(
        sensorMeasurements,
        'sensorCodeName',
      ),
    ).forEach(([sensorCodeName, sensorMeasurements]) => {
      this.server.to(`new{${sensorCodeName}}`).emit('many', sensorMeasurements);
    });
  }

  broadcastOneNew(sensorMeasurement: ISensorMeasurement): void {
    this.server
      .to(`new{${sensorMeasurement.sensorCodeName}}`)
      .emit('one', sensorMeasurement);
  }

  async handleConnection(client: Socket): Promise<void> {
    const latestMeasurements =
      await this.sensorMeasurementRepo.getLatestForEachSensor();

    await Promise.all(
      latestMeasurements.map(({ sensorCodeName }) =>
        client.join(`new{${sensorCodeName}}`),
      ),
    );

    client.emit('latest', latestMeasurements);
  }

  // @UseWSMessageValidationPipe()
  // @SubscribeMessage('asd')
  // async handleEvent2(@MessageBody() data: MessageDTO): Promise<string> {
  //   console.log('data: ', data);
  //   await this.sensorMeasurementRepo.findManyWith({ sensorCodeName: 'O2' });
  //   return 'a';
  // }
}
