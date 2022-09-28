import { createSlice } from '@reduxjs/toolkit';

export interface ApiResponseState {
  loading: boolean;
  dataToShow: [];
  error: string;
  searchTerm: string;
}

export const initialState: ApiResponseState = {
  loading: false,
  dataToShow: [],
  error: '',
  searchTerm: ''
};

const ituneSlice = createSlice({
  name: 'Itune',
  initialState,
  reducers: {
    getSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    getDataToShow: (state, action) => {
      state.dataToShow = action.payload;
    }
  }
});

export const { getSearchTerm, getDataToShow } = ituneSlice.actions;

export default ituneSlice.reducer;
