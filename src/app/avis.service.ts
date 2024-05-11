import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Avis } from './models/avis';
import { CreateAvis } from './models/createAvis';

@Injectable({
  providedIn: 'root'
})
export class AvisService {
  private url = "http://localhost:8080/lilkre-back/api/v1/avis";

  constructor(private http: HttpClient) { }
  public getAllAvis(): Observable<Avis[]> {
    return this.http.get<Avis[]>(`${this.url}`);

  }
  public getAvis(id:number): Observable<Avis> {

    return this.http.get<Avis>(`${this.url}/${id}`);

  }
  public addAvis(avis:CreateAvis): Observable<CreateAvis> {
    return this.http.post<CreateAvis>(`${this.url}`, avis);

  }
  public UpdateAvis( avis: CreateAvis): Observable<CreateAvis> {
    return this.http.put<CreateAvis>(`${this.url}`, avis);
  }

  public deleteAvis(id:number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);

  }
}
