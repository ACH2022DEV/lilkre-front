import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjouterCommande } from './models/AjouterCommande';
import { Commandes } from './models/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandesService {

  private url = "http://localhost:8080/lilkre-back/api/v1/commande";

  constructor(private http: HttpClient) { }



  public getAllCommandes(): Observable<Commandes[]> {
    return this.http.get<Commandes[]>(`${this.url}`);

  }
  public getCommande(id: number): Observable<Commandes> {

    return this.http.get<Commandes>(`${this.url}/${id}`);

  }
  public addCommande(commande: AjouterCommande): Observable<AjouterCommande> {
    return this.http.put<AjouterCommande>(`${this.url}`,commande);

  }
  public deleteCommande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);

  }
}
