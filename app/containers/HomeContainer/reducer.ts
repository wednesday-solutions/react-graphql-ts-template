import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: homeContainerTypes, Creators: homeContainerCreators } = createActions({
  requestGetLaunchList: ['launchQuery'],
  successGetLaunchList: ['launchData'],
  failureGetLaunchList: ['launchListError'],
  clearLaunchList: {}
});
export const initialState = { launchQuery: null, launchData: {}, launchListError: null };

export const homeContainerReducer = (
  state = initialState,
  action: { type?: any; somePayload?: string; launchQuery?: any; launchData?: any; error?: any }
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case homeContainerTypes.REQUEST_GET_LAUNCH_LIST:
        draft.launchQuery = action.launchQuery;
        break;
      case homeContainerTypes.CLEAR_LAUNCH_LIST:
        draft.launchQuery = null;
        draft.launchListError = null;
        draft.launchData = {};
        break;
      case homeContainerTypes.SUCCESS_GET_LAUNCH_LIST:
        draft.launchData = action.launchData.data;
        break;
      case homeContainerTypes.FAILURE_GET_LAUNCH_LIST:
        draft.launchListError = get(action.launchData.errors, 'message', 'something_went_wrong');
        break;
    }
  });

export default homeContainerReducer;
