import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { ConfigKeys, IAppConfigMap, TypedConfigService } from 'src/config';

export class WebsocketGatewayAdapter extends IoAdapter {
  constructor(
    private app: INestApplicationContext,
    private readonly configService: TypedConfigService<IAppConfigMap>,
  ) {
    super(app);
  }

  createIOServer(
    _: /* previously web socket port */ number,
    options?: ServerOptions,
  ): any {
    const server = super.createIOServer(
      this.configService.get(ConfigKeys.WEB_SOCKET_SERVER_PORT),
      {
        ...options,
        transports: ['websocket', 'polling'],
        path: this.configService.get(ConfigKeys.WEB_SOCKET_SERVER_PATH),
      },
    );
    return server;
  }
}
