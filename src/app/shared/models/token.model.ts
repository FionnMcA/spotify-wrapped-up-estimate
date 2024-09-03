export interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

export interface SpotifyArtistResponse {
    items: Artist[];
}

export interface Artist {
    id: string;
    name: string;
    genres: string[];
    images: { url: string; height: number; width: number; }[];
}

export interface SpotifyTrackResponse {
    items: Track[]; 
}

export interface Track {
    id: string;
    name: string;
    duration_ms: number;
    artists: Artist[];
    album: Album;
}

export interface Album {
    id: string;
    name: string;
    images: { url: string; height: number; width: number; }[];
}