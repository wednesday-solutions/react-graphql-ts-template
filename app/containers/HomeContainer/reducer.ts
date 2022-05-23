import { createSlice } from '@reduxjs/toolkit';
import get from 'lodash-es/get';
import { prepare } from '@app/utils';

export const initialState = {
  loading: false,
  launchData: {},
  launchListError: null
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    requestGetLaunchList: {
      reducer: (state) => {
        state.loading = true;
      },
      prepare
    },
    successGetLaunchList(state, action) {
      state.launchListError = null;
      state.launchData = action.payload;
      state.loading = false;
    },
    failureGetLaunchList(state, action) {
      state.launchListError = get(action.payload, 'message', 'something_went_wrong');
      state.loading = false;
    }
  }
});

export const { requestGetLaunchList, successGetLaunchList, failureGetLaunchList } = homeSlice.actions;

export default homeSlice.reducer;
