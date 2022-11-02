export type RouteConstant = {
  route: string;
  exact?: boolean;
  isProtected?: boolean;
  props?: object;
};

const routeConstants: Record<string, RouteConstant> = {
  // home: {
  //   route: '/',
  //   exact: true
  // },
  itune: {
    route: '/',
    exact: true
  },
  // launch: {
  //   route: '/launch/:launchId',
  //   exact: true
  // },
  song: {
    route: '/song/:trackId',
    exact: true
  }
};

export type RouteKeys = keyof typeof routeConstants;

export default routeConstants;
