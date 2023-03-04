import { Profile, Login, Registration, Root } from 'pages';
import { UserOutlined } from '@ant-design/icons';
import {
  RoutesEnum,
  AuthedRouteEntity,
  RoutesMap,
  SimpleRouteEntity,
  ISession,
} from 'types';
import { Select } from 'antd';

export const publicRoutes: RoutesMap<SimpleRouteEntity> = {
  [RoutesEnum.ROOT]: {
    Component: Root,
  },
  // [RoutesEnum.ERROR_404]: {
  //   Component: Error404,
  // },
};

export const routesOnlyForNotAuthedUsers: RoutesMap<SimpleRouteEntity> = {
  [RoutesEnum.LOGIN]: {
    Component: Login,
  },
  [RoutesEnum.REGISTRATION]: {
    Component: Registration,
  },
};

export const routesOnlyForAuthedUsers: RoutesMap<AuthedRouteEntity> = {
  [RoutesEnum.PROFILE]: {
    Component: Profile,
    isMenuPoint: true,
    menuTitle: 'Profile menu item',
    pageTitle: 'Данные по бассейну',
    menuIcon: <UserOutlined />,
    canUserOpenThisRoute: () => true,
    Extras: () => (
      <Select
        defaultValue="1"
        style={{ width: 150 }}
        options={[{ value: '1', label: 'Бассейн №1' }]}
      />
    ),
  },
  [RoutesEnum.USER]: {
    Component: Profile,
    menuTitle: 'User menu item',
    pageTitle: 'User page header',
    description: 'User desc',
    menuIcon: <UserOutlined />,
    canUserOpenThisRoute: () => true,
    Extras: () => <>Extras react component</>,
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getAuthedFallbackRoute = (session: ISession) => RoutesEnum.PROFILE;

export const notAuthedFallbackRoute = RoutesEnum.LOGIN;
export const publicFallbackRoute = RoutesEnum.ROOT;
