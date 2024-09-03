import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Subscription } from 'rxjs';
import { SpotifyService } from '../shared/services/spotify.service';
import { VersionUtils } from '../shared/utils/version.utils';
import { CapitalizeFirstPipe } from '../shared/pipes/capitalize-first.pipe';
import { EllipsisPipe } from '../shared/pipes/ellipsis.pipe';
import { Artist, Track } from '../shared/models/token.model';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, CapitalizeFirstPipe, EllipsisPipe],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit, OnDestroy {
  private spotifyService = inject(SpotifyService);
  private subscriptions: Subscription[] = [];
  private completedRequests = 0;

  topTracks = signal<any[]>([]);
  topArtists = signal<any[]>([]);
  topArtistImg = '';
  topGenre = signal<string>('');
  minutesListened = signal<number>(0);

  selectedColor: string = 'blue';
  loading: boolean = true;

  ngOnInit(): void {
    this.fetchTracks()
    this.fetchArtists()
    this.fetchRecentlyPlayed()
  }

  // Fecth Top 5 tracks of the last year
  fetchTracks(){
    const subscription = this.spotifyService.fetchTopTracks().pipe(
        map(response => response.items)
    ).subscribe({
      next: (response: Track[]) => { 
        this.topTracks.set(response);
        console.log('Top tracks fetched successfully');
        this.checkLoadingStatus();
      },
      error: (error) => { 
        console.log('Error fetching top tracks ', error);
        this.checkLoadingStatus();
      }      
    });
    this.subscriptions.push(subscription)
  }

  // Fetch the top 5 artists, the image of the top artist, and the most frequent genre from the past year.
  fetchArtists(){
     const subscription = this.spotifyService.fetchTopArtists().pipe(
        map(response => response.items)
    ).subscribe({
      next: (response: Artist[]) => { 
        this.topGenre.set(VersionUtils.topGenre(response))
        this.topArtists.set(response.slice(0, 5));
        this.topArtistImg = response[0].images[0].url;
        console.log('Top artists fetched successfully');
        this.checkLoadingStatus();
      },
      error: (error) => { 
        console.log('Error fetching top artists', error);
        this.checkLoadingStatus();
      }
    });
    this.subscriptions.push(subscription)
  }

  // Fetch recently played tracks to estimate the total minutes listened.
  fetchRecentlyPlayed(){
    const subscription = this.spotifyService.fetchRecentlyPlayed().pipe(
        map(response => response.items)
    ).subscribe({
      next: (response: Track[]) => {
        this.minutesListened.set(VersionUtils.minutesListend(response));
        console.log('Recently played tracks fetched successfully');
        this.checkLoadingStatus();
      },
      error: (error) => { 
        console.log('Error fetching recently played tracks', error);
        this.checkLoadingStatus();
      }
    })
    this.subscriptions.push(subscription);
  }

  checkLoadingStatus() {
    this.completedRequests += 1;

    if (this.completedRequests === 3) {
      this.loading = false;
    }
  }

  // Change the card colour (red, blue, green or orange)
  changeBackgroundColor(color: string) {
    this.selectedColor = color;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    console.log('Destroying results');
  }
}
