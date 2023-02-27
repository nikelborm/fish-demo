import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { groupBy } from 'src/tools';
import { Server, Socket } from 'socket.io';
import { CreatePredictDTO } from 'src/types';

@WebSocketGateway({ namespace: '/predict' })
export class PredictWSGateway implements OnGatewayConnection {
  #latestPredicts: Map<string, CreatePredictDTO> = new Map([
    [
      'isOk',
      {
        predictCodeName: 'isOk',
        date: new Date(),
        value: 1,
      },
    ],
  ]);

  @WebSocketServer()
  server!: Server;

  broadcastManyNew(predicts: CreatePredictDTO[]): void {
    Object.entries(
      groupBy<'predictCodeName', CreatePredictDTO>(predicts, 'predictCodeName'),
    ).forEach(([predictCodeName, predicts]) => {
      this.server
        .to(`newPrediction/${predictCodeName}`)
        .emit('one', predicts[0]);
    });

    let hasChanged = false; // move to util function
    predicts.forEach((predict) => {
      const currentLatestDate = this.#latestPredicts.get(
        predict.predictCodeName,
      )?.date;
      if (!currentLatestDate || currentLatestDate < predict.date) {
        this.#latestPredicts.set(predict.predictCodeName, predict);
        hasChanged = true;
      }
    });
    if (hasChanged) {
      this.#latestPredicts = new Map(this.#latestPredicts);
    }
  }

  broadcastOneNew(predict: CreatePredictDTO): void {
    this.server
      .to(`newPrediction/${predict.predictCodeName}`)
      .emit('one', predict);
  }

  async handleConnection(client: Socket): Promise<void> {
    await Promise.all(
      [...this.#latestPredicts.keys()].map((predictCodeName) =>
        client.join(`newPrediction/${predictCodeName}`),
      ),
    );

    client.emit('latest', [...this.#latestPredicts.values()]);
  }
}
