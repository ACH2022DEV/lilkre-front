import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { Avis } from '../models/avis';
import { Personne } from '../models/personne';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private url = "http://localhost:8080/lilkre-back/api/v1/article";
  private url2 = "http://localhost:8080/lilkre-back/api/v1/personne";
  private search="http://localhost:8080/lilkre-back/api/v1/avis";


  constructor(private http: HttpClient) { }
  public Search(pageNo:number,size:number,search:string): Observable<Article[]>{
    return this.http.get<Article[]>(`${this.url}/search?page=${pageNo}&size=${size}&search=${search}`);
  }
  public SearchbyRemise(pageNo:number,size:number,remise:number): Observable<Article[]>{
    return this.http.get<Article[]>(`${this.url}/searchByRemise?page=${pageNo}&size=${size}&remise=${remise}`);
  }
  public SearchPersonne(pageNo:number,size:number,searchPersonne:string): Observable<Personne[]>{
    return this.http.get<Personne[]>(`${this.url2}/search?page=${pageNo}&size=${size}&search=${searchPersonne}`);
  }
  public SearchAvis(pageNo:number,size:number,searchAvis:any): Observable<Avis[]>{
    return this.http.get<Avis[]>(`${this.search}/search?page=${pageNo}&size=${size}&Nbetoile=${searchAvis}`);
  }

}
