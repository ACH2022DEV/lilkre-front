import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SocialService {

  private baseUrl = 'http://localhost:8080/lilkre-back/api/v1/social/';
  constructor(private http: HttpClient) { }

  loginWithGoogle(token: any): Observable<any>{
    // @ts-ignore
    return this.http.post<any>(`${this.baseUrl}google`, {token}).pipe(
      map(
        response => {
         // console.log(response)
          return response;
        }
      )
    );
  }
  loginWithFacebook(token: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}facebook`, {token}).pipe(
      map(
        response => {
          sessionStorage.setItem('token',response.token);
          return response;
        }
      )
    );
  }
  loginWithMicrosoft(token: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}microsoft`, {token}).pipe(
      map(
        response => {
          sessionStorage.setItem('token',response.token);
          return response;
        }
      )
    );
  }
}
