import { Manager } from 'socket.io-client';
import { useEffect, useRef } from 'react';

const socketManager = new Manager({
  transports: ['websocket', 'polling'],
  path: '/api/ws',
  autoConnect: false,
});
// const manager =

// export const MyGlobalContext = createContext<{ manager: Manager }>({
//   manager: socketManager,
// });

// export const WebSocketManagerContextProvider = () => <MyGlobalContext.Provider value={}/>;

export function useSocket(config: {
  namespace: string;
  handlers: Record<string, (message?: any) => void>;
  onConnect?: () => void;
  onDisconnect?: () => void;
}) {
  // const ref =  useRef({});
  const socket = socketManager.socket(config.namespace, {
    auth: {
      // TODO: подключить сюда токен из локалхоста
      token: '123',
    },
  });

  useEffect(() => {
    socket.on('connect', () => {});

    socket.on('disconnect', () => {});

    for (const [event, handler] of Object.entries(config.handlers)) {
      socket.on(event, handler);
    }

    socket.on('exception', (backendError) => {
      // eslint-disable-next-line no-console
      console.error('error: ', backendError);
    });

    socket.connect();
    return () => {
      // do not forget to off every new socket.on event handlers
      socket.off('connect');
      socket.off('disconnect');

      for (const event of Object.keys(config.handlers)) {
        socket.off(event);
      }
      socket.off('exception');
    };
  }, []);
}
