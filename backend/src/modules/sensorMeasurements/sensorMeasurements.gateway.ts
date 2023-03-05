import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { groupBy, UseWSMessageValidationPipe } from 'src/tools';
import { repo } from '../infrastructure';
import { Server, Socket } from 'socket.io';
import {
  ISensorMeasurement,
  SubscribeToReservoirLiveSensorsDTO,
} from 'src/types';

@WebSocketGateway({ namespace: '/sensorMeasurement' })
export class SensorMeasurementWSGateway implements OnGatewayConnection {
  constructor(
    private readonly sensorMeasurementRepo: repo.SensorMeasurementRepo,
  ) {}

  @WebSocketServer()
  server!: Server;

  broadcastManyNew(sensorMeasurements: ISensorMeasurement[]): void {
    sensorMeasurements.reduce(
      (result, item) => ({
        ...result,
        [item.sensorParameterInstance.sensorParameter.name]: [
          ...(result[item.sensorParameterInstance.sensorParameter.name] || []),
          item,
        ],
      }),
      Object.create(null),
    );

    // Object.entries(
    //   groupBy<'sensorCodeName', ISensorMeasurement>(
    //     sensorMeasurements,
    //     'sensorCodeName',
    //   ),
    // ).forEach(([sensorCodeName, sensorMeasurements]) => {
    //   this.server
    //     .to(`newSensorMeasurement/${sensorCodeName}`)
    //     .emit('many', sensorMeasurements);
    // });
  }

  broadcastOneNew(sensorMeasurement: ISensorMeasurement): void {
    this.server
      .to(`newSensorMeasurement/${sensorMeasurement.sensorCodeName}`)
      .emit('one', sensorMeasurement);
  }

  async handleConnection(client: Socket): Promise<void> {
    const latestMeasurements =
      await this.sensorMeasurementRepo.getLatestForEachSensor();

    await Promise.all(
      latestMeasurements.map(({ sensorCodeName }) =>
        client.join(`newSensorMeasurement/${sensorCodeName}`),
      ),
    );

    client.emit('latest', latestMeasurements);
  }

  @UseWSMessageValidationPipe()
  @SubscribeMessage('subscribe/liveSensorMeasurements/byReservoir')
  async handleEvent2(
    @MessageBody() { reservoirId }: SubscribeToReservoirLiveSensorsDTO,
    @ConnectedSocket() client: Socket,
  ): Promise<string> {
    // TODO: somehow extract user from ws connection context and validate if user has access to this reservoir
    console.log('data: ', data);
    client.join();
    await this.sensorMeasurementRepo.findManyWith({ reservoirId });
    return 'a';
  }
}
