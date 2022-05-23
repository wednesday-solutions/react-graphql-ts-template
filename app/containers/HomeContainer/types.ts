import { AnyAction } from 'redux';
import { IntlShape } from 'react-intl';
import { GqlQueryReponse } from '@app/utils/graphqlUtils';
export interface Launch {
  id: string;
  missionName: string;
  launchDateUtc: string;
  launchDateUnix: number;
  links: {
    wikipedia: string;
    flickrImages: Array<string>;
  };
}

export interface LaunchData {
  launches?: Launch[];
}
export interface RequestLaunchesActionPayload {
  missionName: string | null;
  order: string | null; // 'asc' | 'desc'
  page: number; // starts from 1
}

export type LaunchesActionCreator = (payload: RequestLaunchesActionPayload) => AnyAction;

export interface HomeContainerProps {
  dispatchLaunchList: LaunchesActionCreator;
  launchData: LaunchData;
  launchListError?: string;
  loading: boolean;
  intl: IntlShape;
}

export type LaunchesResponse = GqlQueryReponse<{ launches?: Launch[] }>;

export interface LaunchesAction {
  payload: { missionName: any; order: any; page: any };
  type: string;
}
