import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../../shared/environments/baseUrl';
import { TranslationService } from '../translation/translation.service';

@Injectable({
  providedIn: 'root'
}) 
export class PeopleService {

  constructor(private httpClient:HttpClient,private translateService:TranslationService) { }
   popularPeople(page:string):Observable<any>{
        return this.httpClient.get(`${baseUrl.url}/3/person/popular?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}&page=${page}`)
      }
   popularPeopleDetails(id:string):Observable<any>{
        return this.httpClient.get(`${baseUrl.url}/3/person/${id}?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}&page=1`)
      }
      getActorCredits(id:string):Observable<any>{
        return this.httpClient.get(`${baseUrl.url}/3/person/${id}/combined_credits?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=${this.translateService.getCurrentApiLang()}&page=1`)
      } 
      
}
 