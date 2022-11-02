import React from 'react';
import ItunesContainer from '@containers/ItunesContainer/Loadable';
import SongDetails from '@containers/SongDetailsContainer/Loadable';
import routeConstants, { RouteConstant } from '@utils/routeConstants';

type RouteConfig = Record<string, { component: React.FC<any> } & Partial<RouteConstant>>;

export const routeConfig: RouteConfig = {
  itune: {
    component: ItunesContainer,
    ...routeConstants.itune
  },
  song: {
    component: SongDetails,
    ...routeConstants.song
  }
};
