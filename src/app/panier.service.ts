import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Panier } from './models/panier';
import { CreatePanier } from './models/createPanier';


@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private url = "http://localhost:8080/lilkre-back/api/v1/panier";

  constructor(private http: HttpClient) { }



  public getAllPanier(): Observable<Panier[]> {
    return this.http.get<Panier[]>(`${this.url}`);

  }
  public getPanier(id: number): Observable<Panier> {

    return this.http.get<Panier>(`${this.url}/${id}`);

  }
  public getPanierByClientId(id: number): Observable<Panier> {

    return this.http.get<Panier>(`${this.url}/getPanier_Client/${id}`);

  }
  public addPanier(panier: CreatePanier): Observable<CreatePanier> {
    return this.http.put<CreatePanier>(`${this.url}`, panier);

  }
  /* public UpdatePanier( panier: Panier): Observable<Panier> {
    return this.http.put<Panier>(`${this.url}`, panier);
  } */

  public deletePanier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);

  }
  public decrementeQuantity_Article(panier: CreatePanier): Observable<void> {
    return this.http.post<void>(`${this.url}/dimunuerQuantity`, panier);

  }

  public VerifierDisponibility_article(panier: CreatePanier): Observable<any> {
    return this.http.post<any>(`${this.url}/VerifierDisponibility_article`, panier);

  }
}
