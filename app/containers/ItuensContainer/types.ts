export interface Song {
  trackId: number;
  artistName: string;
  artworkUrl100: string;
  collectionName: string;
}

export interface SongData {
  Songs: Song[];
}
