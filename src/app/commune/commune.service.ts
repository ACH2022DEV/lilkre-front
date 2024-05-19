import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommuneService {


  private url = "http://localhost:8080/lilkre-back/api/v1";

  constructor(private http: HttpClient) { }

  public getAllCommune(pageNo:number,size:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/Commune?page=${pageNo}&size=${size}`);

  }
  public getCommune(codeCommune: number): Observable<any> {

    return this.http.get<any>(`${this.url}/Commune/${codeCommune}`);

  }
  public addCommune(nomCommune: any,idGouvernorat:any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const communeData = {
      nom: nomCommune,
      gouvernorat: { id:idGouvernorat }
    };
    return this.http.post<any>(`${this.url}/Commune`, communeData, { headers });

  }
  public UpdateCommune( id:any,nomCommune: any,idGouvernorat:any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const communeData = {
      id:id,
      nom: nomCommune,
      gouvernorat: { id:idGouvernorat }
    };
    return this.http.put<any>(`${this.url}/Commune`, communeData, { headers });

  }
  public deleteCommune(codeCommune: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/Commune/${codeCommune}`);

  }
}
