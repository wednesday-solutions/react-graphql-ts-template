import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';
import { Launch } from '@app/containers/HomeContainer';

export type HomeContainerState = {
  launchQuery: string;
  launchData: {
    launches?: Launch[];
  };
  launchListError: any;
  loading: boolean;
};

export const { Types: homeContainerTypes, Creators: homeContainerCreators } = createActions({
  requestGetLaunchList: ['launchQuery'],
  successGetLaunchList: ['launchData'],
  failureGetLaunchList: ['launchListError']
});

export const initialState: HomeContainerState = {
  loading: false,
  launchQuery: '',
  launchData: {},
  launchListError: null
};

export interface HomeContainerAction extends Partial<Omit<HomeContainerState, 'loading'>> {
  type?: string;
}

export const homeContainerReducer = (state = initialState, action: HomeContainerAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case homeContainerTypes.REQUEST_GET_LAUNCH_LIST:
        draft.loading = true;
        draft.launchQuery = action.launchQuery || '';
        break;

      case homeContainerTypes.SUCCESS_GET_LAUNCH_LIST:
        draft.launchData = action.launchData!;
        draft.loading = false;
        break;
      case homeContainerTypes.FAILURE_GET_LAUNCH_LIST:
        draft.loading = false;
        draft.launchListError = draft.launchListError = get(action.launchListError, 'message', 'something_went_wrong');
        break;
    }
  });

export default homeContainerReducer;
