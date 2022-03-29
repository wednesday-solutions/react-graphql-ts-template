import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash-es/get';
import { Launch } from '@app/containers/HomeContainer';

export type HomeContainerState = {
  launchData: {
    launches?: Launch[];
  };
  launchListError: any;
  loading: boolean;
};

export const { Types: homeContainerTypes, Creators: homeContainerCreators } = createActions({
  requestGetLaunchList: { missionName: null, order: 'asc', page: 1 },
  successGetLaunchList: ['launchData'],
  failureGetLaunchList: ['launchListError']
});

export const initialState: HomeContainerState = {
  loading: false,
  launchData: {},
  launchListError: null
};

export interface HomeContainerAction extends Partial<Omit<HomeContainerState, 'loading'>> {
  type?: string;
  order?: string;
  page?: number;
  missionName?: string;
}

export const homeContainerReducer = (state = initialState, action: HomeContainerAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case homeContainerTypes.REQUEST_GET_LAUNCH_LIST:
        draft.loading = true;
        break;

      case homeContainerTypes.SUCCESS_GET_LAUNCH_LIST:
        draft.launchData = action.launchData!;
        draft.launchListError = null;
        draft.loading = false;
        break;
      case homeContainerTypes.FAILURE_GET_LAUNCH_LIST:
        draft.loading = false;
        draft.launchListError = draft.launchListError = get(action.launchListError, 'message', 'something_went_wrong');
        break;
    }
  });

export default homeContainerReducer;
