export type RouteConstant = {
  route: string;
  exact?: boolean;
  isProtected?: boolean;
  props?: object;
};

const routeConstants: Record<string, RouteConstant> = {
  itune: {
    route: '/',
    exact: true
  },
  song: {
    route: '/song/:trackId',
    exact: true
  }
};

export type RouteKeys = keyof typeof routeConstants;

export default routeConstants;
