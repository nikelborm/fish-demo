import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { OnGatewayConnection } from '@nestjs/websockets';
import { ServerOptions } from 'socket.io';
import { ConfigKeys, IAppConfigMap, TypedConfigService } from 'src/config';

export class WebsocketGatewayAdapter
  extends IoAdapter
  implements OnGatewayConnection
{
  constructor(
    private app: INestApplicationContext,
    private readonly configService: TypedConfigService<IAppConfigMap>,
  ) {
    super(app);
  }

  handleConnection(client: unknown, ...args: any[]): void {
    console.log('client: any, ...args: ', client, args);
  }
  createIOServer(
    _: /* previously web socket port */ number,
    options?: ServerOptions,
  ): any {
    console.log(
      'this.configService.get(ConfigKeys.WEB_SOCKET_SERVER_PORT): ',
      this.configService.get(ConfigKeys.WEB_SOCKET_SERVER_PORT),
    );
    console.log(
      'this.configService.get(ConfigKeys.WEB_SOCKET_SERVER_PATH): ',
      this.configService.get(ConfigKeys.WEB_SOCKET_SERVER_PATH),
    );
    const server = super.createIOServer(
      this.configService.get(ConfigKeys.WEB_SOCKET_SERVER_PORT),
      {
        ...options,
        transports: ['websocket'],
        path: `/${this.configService.get(ConfigKeys.WEB_SOCKET_SERVER_PATH)}`,
      },
    );
    console.log(server);
    return server;
  }
}
