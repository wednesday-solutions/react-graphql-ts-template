import { createSlice } from '@reduxjs/toolkit';
import get from 'lodash-es/get';
import { prepare } from '@app/utils';

export const initialState = {
  launch: {},
  loading: true,
  launchError: null
};

const launchDetailsSlice = createSlice({
  name: 'launchDetails',
  initialState,
  reducers: {
    requestGetLaunch: {
      reducer: (state) => {
        state.loading = true;
      },
      prepare
    },
    successGetLaunch(state, action) {
      state.loading = false;
      state.launchError = null;
      state.launch = get(action.payload, 'launch', {});
    },
    failureGetLaunch(state, action) {
      state.loading = false;
      state.launch = {};
      state.launchError = get(action.payload, 'message', 'something_went_wrong');
    }
  }
});

export const { requestGetLaunch, successGetLaunch, failureGetLaunch } = launchDetailsSlice.actions;

export default launchDetailsSlice.reducer;
