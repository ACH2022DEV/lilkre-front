import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../models/article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private url = "http://localhost:8080/lilkre-back/api/v1";

  constructor(private http: HttpClient) { }
    public getAllArticles(pageNo:number,size:number): Observable<Article[]> {
      return this.http.get<Article[]>(`${this.url}/article?page=${pageNo}&size=${size}`);

    }
    public getarticle(id: number): Observable<Article> {

      return this.http.get<Article>(`${this.url}/article/${id}`);

    }
    public addarticle(articl: FormData): Observable<FormData> {
      return this.http.post<FormData>(`${this.url}/article`, articl);

    }

    public Updatearticle( articl: FormData): Observable<FormData> {
      return this.http.put<FormData>(`${this.url}/article`, articl);

    }
    public deletearticle(id: number): Observable<void> {
      return this.http.delete<void>(`${this.url}/article/${id}`);

    }
}
