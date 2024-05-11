import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/login';
import { Personne } from 'src/app/models/personne';
import { Register } from 'src/app/models/register';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private url = "http://localhost:8080/lilkre-back/api/v1/auth";

  constructor(private http: HttpClient) { }


  public login(login: Login): Observable<Login> {
    return this.http.post<Login>(`${this.url}/login`, login
//,{ withCredentials: true }
);
  }
  public register(register: Register,code:string): Observable<Register> {
    return this.http.post<Register>(`${this.url}/register?code=${code}`, register);

  }
  //ajouter la méthode de verification del'email et username (ajouter plus tard)
   public sendCodeConfirmation(register: Register): Observable<Register> {
    return this.http.post<Register>(`${this.url}/sendCodeConfirmation`, register);

  }
  verifierCompte(identifiant: string) {
    return this.http.post<any>(`${this.url}/verifeCompte?identifiant=${identifiant}`,null);
  }
  public sendCodeForReciveCompte(identifiant: string): Observable<any> {
    return this.http.post<any>(`${this.url}/sendCodeForReciveCompte?identifiant=${identifiant}`, null);

  }
  public VerifierCodeConfirmationOfPassword(identifiant: string,code: string): Observable<any>{
    return this.http.post<any>(`${this.url}/VerifierCodeConfirmationOfPassword?identifiant=${identifiant}&code=${code}`,null);
  }
  public ModifierPassword(identifiant: string,code: string,NewPassword: string): Observable<any>{
    return this.http.post<any>(`${this.url}/ModifierPassword?identifiant=${identifiant}&code=${code}&NewPassword=${NewPassword}`,null);
  }


}
