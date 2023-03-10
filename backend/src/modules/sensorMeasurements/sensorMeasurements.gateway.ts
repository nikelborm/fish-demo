import { BadRequestException } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { messages } from 'src/config';
import { groupByKey, UseWSMessageValidationPipe } from 'src/tools';
import {
  FlatSensorMeasurement,
  GetSensorMeasurementsByReservoirIdDTO,
} from 'src/types';
import { repo } from '../infrastructure';

@WebSocketGateway({ namespace: '/sensorMeasurement' })
export class SensorMeasurementWSGateway /*  implements OnGatewayConnection */ {
  constructor(
    private readonly sensorMeasurementRepo: repo.SensorMeasurementRepo,
    private readonly reservoirRepo: repo.ReservoirRepo,
  ) {}

  @WebSocketServer()
  server!: Server;

  broadcastManyNew(sensorMeasurements: FlatSensorMeasurement[]): void {
    [
      ...groupByKey(sensorMeasurements, 'sensorParameterInstanceId').entries(),
    ].forEach(([sensorParameterInstanceId, filteredSensorMeasurements]) => {
      this.server
        .to(
          `newSensorMeasurement/sensorParameterInstanceId=${sensorParameterInstanceId}`,
        )
        .emit('many', filteredSensorMeasurements);
    });
  }

  @UseWSMessageValidationPipe()
  @SubscribeMessage('latest/byReservoir')
  async getLatestSensorMeasurements(
    @MessageBody() { reservoirId }: GetSensorMeasurementsByReservoirIdDTO,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    // TODO: somehow extract user from ws connection context and validate if user has access to this reservoir
    // TODO: throw error if reservoir not found
    const latestMeasurements =
      await this.sensorMeasurementRepo.getLatestMeasurementsWhereSensorInstanceHas(
        reservoirId,
      );
    console.log('latestMeasurements: ', latestMeasurements);
    client.emit('latest', latestMeasurements);
  }

  @UseWSMessageValidationPipe()
  @SubscribeMessage('subscribe/liveSensorMeasurements/byReservoir')
  async subscribeToLiveSensorMeasurementsByReservoir(
    @MessageBody() { reservoirId }: GetSensorMeasurementsByReservoirIdDTO,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    // TODO: somehow extract user from ws connection context and validate if user has access to this reservoir
    const reservoir = await this.reservoirRepo.getReservoirFullInfo(
      reservoirId,
    );
    if (!reservoir)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(reservoirId, 'reservoir'),
      );

    const sensorParameterInstanceIdsToFollow = reservoir.sensorInstances
      .flatMap(
        ({ abstractSensorToSensorInstance: { sensorParameterInstances } }) =>
          sensorParameterInstances,
      )
      .map(({ id }) => id);

    console.log(
      'sensorParameterInstanceIdsToFollow.map',
      sensorParameterInstanceIdsToFollow.map(
        (id) => `newSensorMeasurement/sensorParameterInstanceId=${id}`,
      ),
    );
    await client.join(
      sensorParameterInstanceIdsToFollow.map(
        (id) => `newSensorMeasurement/sensorParameterInstanceId=${id}`,
      ),
    );
  }
}
