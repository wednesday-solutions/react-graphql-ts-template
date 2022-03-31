export type RouteConstant = {
  route: string;
  exact?: boolean;
  isProtected?: boolean;
  props?: object;
};

const routeConstants: Record<string, RouteConstant> = {
  home: {
    route: '/',
    exact: true
  },
  launch: {
    route: '/:launchId',
    exact: true
  }
};

export type RouteKeys = keyof typeof routeConstants;

export default routeConstants;
