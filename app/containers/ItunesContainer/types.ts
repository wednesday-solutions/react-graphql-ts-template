import { AnyAction } from '@reduxjs/toolkit';

export interface Song {
  trackId: number;
  artistName: string;
  artworkUrl100: string;
  collectionName: string;
}

export interface songData {
  songList: Song[];
}

export type SongActionCreator = (payload: string) => AnyAction;

export interface ItuneContainerProps {
  dispatchArtistName: SongActionCreator;
  songData: {
    resultCount: number;
    results: Song[];
  };
}

export const ituneResponseGenerator = <Data>(ok: boolean, data: Data, error: object) => ({
  ok,
  data,
  error
});
