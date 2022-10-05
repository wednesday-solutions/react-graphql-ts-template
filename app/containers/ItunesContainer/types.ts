export interface song {
  trackId: number;
  artistName: string;
  artworkUrl100: string;
  collectionName: string;
}

export interface songData {
  songList: song[];
}

export const ituneResponseGenerator = <Data>(ok: boolean, data: Data, error?: object) => ({
  ok,
  data,
  error
});
