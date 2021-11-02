import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, of} from "rxjs";
import {Auth} from "../interfaces/auth.interface";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string= environment.apiEndpoint;
  private _auth: Auth | undefined;

  constructor( private http:HttpClient ) { }

  authVerify (): Observable<boolean> {
    if(!localStorage.getItem('token')) {
      return of(false);
    }
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map(auth => {
          this._auth = auth;
          console.log('map',auth);
          return true;
        })
      );

  }

  get auth(): Auth {
    return {...this._auth! }
  }

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap( auth => this._auth = auth ),
        tap( auth => localStorage.setItem('token', auth.id))
      );
  }

  logout() {
    this._auth = undefined;
  }
}
