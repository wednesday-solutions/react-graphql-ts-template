import { createSlice } from '@reduxjs/toolkit';
import { Song } from './types';

export interface ApiResponseState {
  loading: boolean;
  dataToShow: {
    resultCount: number;
    results: Song[];
  };
  error: null;
  searchTerm: string;
}

export const initialState: ApiResponseState = {
  loading: false,
  dataToShow: { resultCount: 0, results: [] },
  error: null,
  searchTerm: ''
};

const ituneSlice = createSlice({
  name: 'Itune',
  initialState,
  reducers: {
    getSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.dataToShow.resultCount = 0;
      state.dataToShow.results = [];
      state.error = null;
      state.loading = true;
    },
    getDataToShow: (state, action) => {
      state.dataToShow = action.payload;
      state.error = null;
      state.loading = false;
    },
    getErrorFromResponse: (state, action) => {
      state.dataToShow.resultCount = 0;
      state.dataToShow.results = [];
      state.searchTerm = '';
      state.loading = false;
      state.error = action.payload;
    },
    deleteResponse: (state) => {
      state.dataToShow.resultCount = 0;
      state.dataToShow.results = [];
      state.loading = false;
    }
  }
});

export const { getSearchTerm, getDataToShow, getErrorFromResponse, deleteResponse } = ituneSlice.actions;

export default ituneSlice.reducer;
