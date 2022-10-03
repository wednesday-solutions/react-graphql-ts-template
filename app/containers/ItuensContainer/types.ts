export interface Song {
  trackId: number;
  artistName: string;
  artworkUrl100: string;
  collectionName: string;
}

export interface SongData {
  Songs: Song[];
}

export const apiResponseGenerator = <Data>(ok: boolean, data: Data, error?: object) => ({
  ok,
  data,
  error
});
