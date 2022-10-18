import { prepare } from '@app/utils';
import { createSlice } from '@reduxjs/toolkit';
import { Song } from './types';

export interface ituneResponseState {
  loading: boolean;
  songData: {
    results: Song[];
  };
  songListError: string;
}

export const initialState: ituneResponseState = {
  loading: false,
  songData: { results: [] },
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
      state.songData.results = action.payload.results;
      state.songListError = '';
      state.loading = false;
    },
    failureGetSongList: (state, action) => {
      state.songData.results = [];
      state.loading = false;
      state.songListError = action.payload;
    }
  }
});

export const { requestGetSongList, successGetSongList, failureGetSongList } = ituneSlice.actions;

export default ituneSlice.reducer;
