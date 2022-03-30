import { createSlice } from '@reduxjs/toolkit';
import get from 'lodash/get';

export const initialState = {
  loading: false,
  launchData: {},
  launchListError: null
};

const homeReducer = createSlice({
  name: 'home',
  initialState,
  reducers: {
    requestGetLaunchList: {
      reducer: (state) => {
        state.loading = true;
      },
      prepare: (payload: object) => {
        return { payload };
      }
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

export const { requestGetLaunchList, successGetLaunchList, failureGetLaunchList } = homeReducer.actions;

export default homeReducer.reducer;
