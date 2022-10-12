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

export type SongActionCreator = (payload: string) => AnyAction;

export interface ItuneContainerProps {
  dispatchArtistName: SongActionCreator;
  songData: {
    results: Song[];
  };
  loading: boolean;
  songListError?: string;
}
