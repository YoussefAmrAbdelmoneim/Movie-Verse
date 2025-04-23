import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../../shared/environments/baseUrl';
import { Observable } from 'rxjs';
import { TranslationService } from '../translation/translation.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient:HttpClient,private translateService:TranslationService ) { }
  getFeaturedMovies():Observable<any>{
    return this.httpClient.get(`${baseUrl.url}/3/trending/all/day?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}`)
  }
  nowPlayingMovies(page:string):Observable<any>{
    return this.httpClient.get(`${baseUrl.url}/3/movie/now_playing?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}&page=${page}`)
  }
  popularMovies(page:string):Observable<any>{
    return this.httpClient.get(`${baseUrl.url}/3/movie/popular?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}&page=${page}`)
  }
  
  topRatedMovies(page:string): Observable<any> {
    return this.httpClient.get(`${baseUrl.url}/3/movie/top_rated?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}&page=${page}`)
  }
  movieGenre(): Observable<any> {
    return this.httpClient.get(`${baseUrl.url}/3/genre/movie/list?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}`)
  }

  upcomingMovies(page:string): Observable<any> {
    return this.httpClient.get(`${baseUrl.url}/3/movie/upcoming?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}&page=${page}`)
  } 

  trendingMoviesThisWeek(): Observable<any> {
    return this.httpClient.get(`${baseUrl.url}/3/trending/movie/week?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}`)
  } 
  getMovieDetails(id: string): Observable<any> {
    return this.httpClient.get(
      `${baseUrl.url}/3/movie/${id}?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}`
    );
  }
  
  getMovieCredits(id: string): Observable<any> {
    return this.httpClient.get(
      `${baseUrl.url}/3/movie/${id}/credits?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}`
    );
  }
  
  getSimilarMovies(id: string): Observable<any> {
    return this.httpClient.get(
      `${baseUrl.url}/3/movie/${id}/similar?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}&page=1`
    );
  }
  getMovieVideos(Id: string,type:string): Observable<any> {
    return this.httpClient.get(
      `${baseUrl.url}/3/${type}/${Id}/videos?api_key=48d62e7452a1f1a5e6018217ac27c50a`
    );
} 
  getMovieImages(Id:string): Observable<any> {
    return this.httpClient.get(
      `${baseUrl.url}/3/movie/${Id}/images?api_key=48d62e7452a1f1a5e6018217ac27c50a`
    );
}
  searchMovies(active:string,term:string): Observable<any> {
    return this.httpClient.get(`${baseUrl.url}/3/search/${active}?query=${term}&api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}`);
}

}