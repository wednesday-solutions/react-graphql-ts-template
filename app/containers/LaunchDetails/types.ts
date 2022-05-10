import { AnyAction } from 'redux';
import { GqlQueryReponse } from '@app/utils/graphqlUtils';
export interface LaunchDetails {
  id: string;
  missionName: string;
  details: string;
  rocket: {
    rocketName: string;
    rocketType: string;
  };
  ships: {
    name: string;
    type: string;
  }[];
  links: {
    flickrImages?: string[];
  };
}

export type LaunchResponse = GqlQueryReponse<LaunchDetails>;

export interface LaunchDetailsProps {
  launch: LaunchDetails | null;
  launchError?: string;
  loading: boolean;
  dispatchLaunch: (launchId: string) => AnyAction;
}
