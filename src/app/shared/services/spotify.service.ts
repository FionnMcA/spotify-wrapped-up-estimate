import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SpotifyArtistResponse, SpotifyTrackResponse } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private httpClient = inject(HttpClient)
  
  fetchTopTracks(){
    return this.httpClient.get<SpotifyTrackResponse>('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5')
  }

  fetchTopArtists(){
    return this.httpClient.get<SpotifyArtistResponse>('https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50')
  }

  fetchRecentlyPlayed(){
    return this.httpClient.get<SpotifyTrackResponse>('https://api.spotify.com/v1/me/player/recently-played?limit=50')
  }
}
