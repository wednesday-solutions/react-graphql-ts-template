export type RouteConstant = {
  route: string;
  exact?: boolean;
  isProtected?: boolean;
  props: object;
};

const routeConstants: Record<string, RouteConstant> = {
  home: {
    route: '/',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  }
};

export type RouteKeys = keyof typeof routeConstants;

export default routeConstants;
