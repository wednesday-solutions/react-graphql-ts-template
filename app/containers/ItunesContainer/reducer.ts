import { prepare } from '@app/utils';
import { createSlice } from '@reduxjs/toolkit';
import { song } from './types';

export interface ituneResponseState {
  loading: boolean;
  songData: {
    resultCount: number;
    results: song[];
  };
  songListError: string;
}

export const initialState: ituneResponseState = {
  loading: false,
  songData: { resultCount: 0, results: [] },
  songListError: ''
};

const ituneSlice = createSlice({
  name: 'Itune',
  initialState,
  reducers: {
    requestGetSongList: {
      reducer: (state) => {
        state.loading = true;
      },
      prepare
    },
    successGetSongList: (state, action) => {
      state.songData = action.payload;
      state.songListError = '';
      state.loading = false;
    },
    failureGetSongList: (state, action) => {
      state.songData.resultCount = 0;
      state.songData.results = [];
      state.loading = false;
      state.songListError = action.payload;
    }
  }
});

export const { requestGetSongList, successGetSongList, failureGetSongList } = ituneSlice.actions;

export default ituneSlice.reducer;
