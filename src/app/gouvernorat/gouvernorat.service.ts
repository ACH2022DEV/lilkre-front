import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GouvernoratService {


  private url = "http://localhost:8080/lilkre-back/api/v1";

  constructor(private http: HttpClient) { }

  public getAllGouvernorat(pageNo:number,size:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/Gouvernorat?page=${pageNo}&size=${size}`);

  }
  public getGouvernorat(codeGouvernorat: number): Observable<any> {

    return this.http.get<any>(`${this.url}/Gouvernorat/${codeGouvernorat}`);

  }
  public addGouvernorat(nomGouvernorat: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const gouvernoratObject = { nom: nomGouvernorat };
    return this.http.post<any>(`${this.url}/Gouvernorat`, gouvernoratObject, { headers });

  }
  public UpdateGouvernorat( nomGouvernorat: any,id:any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const gouvernoratObject = {id:id, nom: nomGouvernorat };
    return this.http.put<any>(`${this.url}/Gouvernorat`, gouvernoratObject, { headers });

  }
  public deleteGouvernorat(codeGouvernorat: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/Gouvernorat/${codeGouvernorat}`);

  }
}
