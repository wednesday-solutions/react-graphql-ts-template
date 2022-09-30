import { createSlice } from '@reduxjs/toolkit';

export interface ApiResponseState {
  loading: boolean;
  dataToShow: [];
  error: null;
  searchTerm: string;
}

export const initialState: ApiResponseState = {
  loading: false,
  dataToShow: [],
  error: null,
  searchTerm: ''
};

const ituneSlice = createSlice({
  name: 'Itune',
  initialState,
  reducers: {
    getSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.dataToShow = [];
      state.error = null;
      state.loading = true;
    },
    getDataToShow: (state, action) => {
      state.dataToShow = action.payload;
      state.error = null;
      state.loading = false;
    },
    getErrorFromResponse: (state, action) => {
      state.dataToShow = [];
      state.searchTerm = '';
      state.loading = true;
      state.error = action.payload;
    }
  }
});

export const { getSearchTerm, getDataToShow, getErrorFromResponse } = ituneSlice.actions;

export default ituneSlice.reducer;
