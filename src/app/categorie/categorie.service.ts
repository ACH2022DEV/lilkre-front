import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private url = "http://localhost:8080/lilkre-back/api/v1";

  constructor(private http: HttpClient) { }
  public getAllCategorie(pageNo:number,size:number): Observable<any> {

    return this.http.get<any>(`${this.url}/Categorie?page=${pageNo}&size=${size}`);

  }
  public getCategorie(codeCategorie: number): Observable<any> {

    return this.http.get<any>(`${this.url}/Categorie/${codeCategorie}`);

  }
  public addCategorie(nomCategorie: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const categorieObject = { nom: nomCategorie };
    return this.http.post<any>(`${this.url}/Categorie`, JSON.stringify(categorieObject), { headers });


  }
  public UpdateCategorie( nomCategorie: any,id:any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const categorieObject = {id:id, nom: nomCategorie };
    return this.http.put<any>(`${this.url}/Categorie`, categorieObject, { headers });

  }
  public deleteCategorie(codeCategorie: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/Categorie/${codeCategorie}`);

  }
}
