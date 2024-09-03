import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { VersionUtils } from '../utils/version.utils';
import { SpotifyTokenResponse } from '../models/token.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken = signal<string>('')
  private httpClient = inject(HttpClient)

  private redirectUri = environment.REDIRECT_URI
  private clientId = environment.SPOTIFY_CLIENT_ID
  private clientSecret = environment.SPOTIFY_CLIENT_SECRET

  goToSpotifyAuthorizePage(){
    const state = VersionUtils.generateRandomString();
    const scope = 'user-top-read user-read-recently-played';
    
    const baseUrl = 'https://accounts.spotify.com/authorize';

    const queryParams = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      scope: scope,
      redirect_uri: this.redirectUri,
      state: state
    });

    window.location.href = `${baseUrl}?${queryParams.toString()}`;
  }

   exchangeCodeForToken(code: string){
    const body = new HttpParams()
    .set('code', code)
    .set('redirect_uri', this.redirectUri)
    .set('grant_type', 'authorization_code');

    const authHeader = btoa(`${this.clientId}:${this.clientSecret}`);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${authHeader}`
    });

    return this.httpClient
      .post<SpotifyTokenResponse>('https://accounts.spotify.com/api/token',
        body.toString(), { headers }
      ).pipe(tap({
        next: (response) => this.accessToken.set(response.access_token),
        error: (error) => console.log('Error exchanging auth code for access token ', error)
      }))
  }

  get token() {
    return this.accessToken()
  }
}
