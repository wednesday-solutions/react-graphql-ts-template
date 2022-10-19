import { AnyAction } from '@reduxjs/toolkit';

export interface Song {
  trackId: number;
  artistName: string;
  artworkUrl100: string;
  collectionName: string;
  previewUrl: string;
}

export interface SongData {
  results: Song[];
}

export interface RequestSongListActionPayload {
  artistName: string;
}
export type SongActionCreator = (payload: any) => AnyAction;

export interface ItuneContainerProps {
  dispatchSongList: SongActionCreator;
  songData: {
    results: Song[];
  };
  loading: boolean;
  songListError?: string;
}
