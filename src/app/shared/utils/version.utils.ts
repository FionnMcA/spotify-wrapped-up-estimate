export class VersionUtils {
    static generateRandomString(){
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(let i = 0; i < 16; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return text;
    }

    // Spotify's API does not directly provide data on a user's top genre.
    // However, it does provide the user's top artists, each of whom is associated with an array of genres.
    // This function processes the user's top artists and iterates through each artist's genres.
    // It uses a dictionary (genreDict) to count the occurrences of each genre.
    // The genre is stored as a key, and its count (i.e., the number of occurrences) is stored as the value.
    // Finally, the genres are sorted by their occurrence count, and the most frequent genre is returned.
    static topGenre(artists: any[]){
        let genreDict: { [key: string]: number} = {};
        artists.forEach((artist) => {
            artist.genres.forEach((genre: any) => {
                genreDict[genre] = (genreDict[genre] || 0) + 1;
            })
        })
        const sortedGenres = Object.entries(genreDict).sort(
            (a, b) => {
                return b[1] - a[1]
            }
        )
        return sortedGenres[0][0];
    }

    // Spotify's API does not provide data on the total minutes a user has listened.
    // However, it does provide the user's 50 most recently played tracks, each of which includes
    // its duration and the timestamp of when it was listened to.
    // This function calculates the total duration (in minutes) of these 50 tracks.
    // It also calculates the time span (i.e., the length of time between the most recent track and the 50th most recent track).
    // Finally, it estimates the average minutes listened per year by scaling the average daily listening time across a year.
    static minutesListend(recentPlays: any): number{
        if(recentPlays.length > 0){
            const totalMinutes = this.totalMinutesListening(recentPlays);
            const timeSpan = this.listeningTimeSpan(recentPlays)
            return Math.round((totalMinutes / timeSpan) * 365) 
        }
        return 0;
    }

    private static msToMins(milliseconds: number){
        const mins = Math.floor(milliseconds / 60000);
        const secs = (milliseconds % 60000) / 1000;
        const totalMins = mins + secs / 60;
        return totalMins
    }

    private static totalMinutesListening(recentPlays: any){
        return recentPlays.reduce((total: number, track: any) => {
            const trackDuration = this.msToMins(track.track.duration_ms);
            return total + trackDuration;
        }, 0);
    }

    private static listeningTimeSpan(recentPlays: any[]){
        const firstPlayed = new Date(recentPlays[0].played_at);
        const lastPlayed = new Date(recentPlays[recentPlays.length - 1].played_at );
        const timeSpan = (firstPlayed.getTime() - lastPlayed.getTime()) / (1000 * 60 * 60 * 24);
        return timeSpan;
    }
}