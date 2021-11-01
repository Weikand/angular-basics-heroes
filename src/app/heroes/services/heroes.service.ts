import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {Hero} from "../interfaces/heroes.interface";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private endpoint:string = environment.apiEndpoint;

  constructor( private http: HttpClient ) { }

  getHeroes():Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.endpoint}/heroes`);
  }

  getHeroById( id:string ):Observable<Hero> {
    return this.http.get<Hero>(`${this.endpoint}/heroes/${id}`);
  }

  getHeroSuggestions( input:string ): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.endpoint}/heroes?q=${input.trim()}&_limit=5`);
  }

  saveHero( hero: Hero ): Observable<Hero> {
    return this.http.post<Hero>(`${this.endpoint}/heroes`, hero);
  }

  updateHero( hero: Hero ): Observable<Hero> {
    return this.http.put<Hero>(`${this.endpoint}/heroes/${hero.id}`, hero);
  }

  deleteHero( heroId: string ): Observable<any> {
    return this.http.delete<any>(`${this.endpoint}/heroes/${heroId}`);
  }
}
