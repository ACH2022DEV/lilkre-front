import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {

  private url = "http://localhost:8080/lilkre-back/api/v1/Envies";

  constructor(private http: HttpClient) { }
  public getAllEnvies(pageNo:number,size:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}?page=${pageNo}&size=${size}`);

  }
  public getEnvies(id: number): Observable<any> {

    return this.http.get<any>(`${this.url}/${id}`);

  }
  public addEnvies(Envies: any): Observable<any> {
    return this.http.post<any>(`${this.url}`, Envies);

  }


  public deleteEnvies(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);

  }
}
