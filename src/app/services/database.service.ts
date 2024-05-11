import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personne } from '../models/personne';
import { Details } from '../models/detail';
import { Article } from '../models/article';
import { Facture } from '../models/facture';
import { Devis } from '../models/devis';
import { CreateDevis } from '../models/CreateDevis';
import { CreateFacture } from '../models/createFacture';



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private url = "http://localhost:8080/lilkre-back/api/v1";

  constructor(private http: HttpClient) { }
//juste pour faire le test
public addoffer(offer:any): Observable<any> {
  return this.http.post<any>(`http://127.0.0.1:8002/offer/new`, offer);

}

//end test
//les api de personne//
  public getAllPersonne(pageNo:number,size:number): Observable<Personne[]> {
    return this.http.get<Personne[]>(`${this.url}/personne?page=${pageNo}&size=${size}`);

  }
  public getPersonne(id:number): Observable<Personne> {

    return this.http.get<Personne>(`${this.url}/personne/${id}`);

  }
  public addPersonne(personne:FormData): Observable<FormData> {
    return this.http.post<FormData>(`${this.url}/personne`, personne);

  }
  public UpdatePersonne( personne:FormData): Observable<FormData> {
    return this.http.put<FormData>(`${this.url}/personne`, personne);
  }

  public deletePersonne(id:number): Observable<void> {
    return this.http.delete<void>(`${this.url}/personne/${id}`);

  }
  //les api de details
  public getAllDetails(pageNo:number,size:number): Observable<Details[]> {
    return this.http.get<Details[]>(`${this.url}/details?page=${pageNo}&size=${size}`);

  }
  public getDetails(id: number): Observable<Details> {

    return this.http.get<Details>(`${this.url}/details/${id}`);

  }
  public addDetails(det: Details): Observable<Details> {
    return this.http.post<Details>(`${this.url}/details`, det);

  }
  public UpdateDetails( detail: Details): Observable<Details> {
    return this.http.put<Details>(`${this.url}/details`, detail);

  }
  public deleteDetails(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/details/${id}`);

  }
  //les api d'aticles
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
  ///les apis des factures
  public getAllfactures(pageNo:number=0,size:number=2): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.url}/facture?page=${pageNo}&size=${size}`);

  }
  public getfacture(id: number): Observable<Facture> {

    return this.http.get<Facture>(`${this.url}/facture/${id}`);

  }
  public addfacture(fact: CreateFacture): Observable<CreateFacture> {
    return this.http.post<CreateFacture>(`${this.url}/facture`, fact);

  }
  public Updatefacture(fact: Facture): Observable<Facture> {
    return this.http.put<Facture>(`${this.url}/facture`, fact);

  }
  public deletefacture(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/facture/${id}`);

  }
  //les apis de devis

  public getAllDevis(pageNo:number,size:number): Observable<Devis[]> {
    return this.http.get<Devis[]>(`${this.url}/devis?page=${pageNo}&size=${size}`);

  }
  public getdevis(codedevis: number): Observable<Devis> {

    return this.http.get<Devis>(`${this.url}/devis/${codedevis}`);

  }
  public adddevis(fact: CreateDevis): Observable<CreateDevis> {
    return this.http.post<CreateDevis>(`${this.url}/devis`, fact);

  }
  public Updatedevis( codedevis: Devis): Observable<Devis> {
    return this.http.put<Devis>(`${this.url}/devis`, codedevis);

  }
  public deletedevis(codedevis: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/devis/${codedevis}`);

  }

  // développer une méthode qui va appeler le controleur et qui permet de retourner une personne
}
