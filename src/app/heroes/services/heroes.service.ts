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
}
