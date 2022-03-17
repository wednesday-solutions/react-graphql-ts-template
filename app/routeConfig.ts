import React from 'react';
import NotFound from '@containers/NotFoundPage/Loadable';
import LaunchesProvider from '@containers/LaunchesProvider';
import routeConstants, { RouteConstant } from '@utils/routeConstants';

type RouteConfig = Record<string, { component: React.FC<any> } & Partial<RouteConstant>>;

export const routeConfig: RouteConfig = {
  home: {
    component: LaunchesProvider,
    ...routeConstants.home
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
