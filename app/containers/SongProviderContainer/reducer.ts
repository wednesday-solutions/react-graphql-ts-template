import { prepare } from '@app/utils';
import { createSlice } from '@reduxjs/toolkit';
import { Song } from '../ItunesContainer/types';

interface songProviderState {
  songData: {
    results: Song[];
  };
  loading: boolean;
  songListError: string;
}

export const initialState: songProviderState = {
  songData: {
    results: []
  },
  loading: false,
  songListError: ''
};

const SongProviderSlice = createSlice({
  name: 'SongProviderSlice',
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

export const { requestGetSongList, successGetSongList, failureGetSongList } = SongProviderSlice.actions;

export default SongProviderSlice.reducer;
