import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../../shared/environments/baseUrl';
import { TranslationService } from '../translation/translation.service';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  constructor(private httpClient:HttpClient,private translateService:TranslationService ) { }
  popularTvShows(page:string):Observable<any>{
      return this.httpClient.get(`${baseUrl.url}/3/tv/popular?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}&page=${page}`)
    }
    airingTvShows(page:string):Observable<any>{
      return this.httpClient.get(`${baseUrl.url}/3/tv/on_the_air?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}&page=${page}`)
    }
     topRatedTvShows(page:string): Observable<any> {
        return this.httpClient.get(`${baseUrl.url}/3/tv/top_rated?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}&page=${page}`)
      }
       
  trendingTvShowsThisWeek(): Observable<any> {
    return this.httpClient.get(`${baseUrl.url}/3/trending/tv/week?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}`)
  }
  getTvDetails(id: string): Observable<any> {
    return this.httpClient.get(
      `${baseUrl.url}/3/tv/${id}?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}`
    );
  }
  
  getTvCredits(id: string): Observable<any> {
    return this.httpClient.get(
      `${baseUrl.url}/3/tv/${id}/credits?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}`
    );
  }
  
  getSimilarTvShows(id: string): Observable<any> {
    return this.httpClient.get(
      `${baseUrl.url}/3/tv/${id}/similar?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}&page=1`
    );
}
getSeasonEpisodes(tvId: number, seasonNumber: number): Observable<any> {
  return this.httpClient.get(`${baseUrl.url}/3/tv/${tvId}/season/${seasonNumber}?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}`);
}
getTvImages(Id:string): Observable<any> {
  return this.httpClient.get(
    `${baseUrl.url}/3/tv/${Id}/images?api_key=48d62e7452a1f1a5e6018217ac27c50a`
  );
}
getSeasonEpisodesDetails(tvId: string, seasonNumber: string,episodeNumber:string): Observable<any> {
  return this.httpClient.get(
    `${baseUrl.url}/3/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}`
  ); 
}
}
 