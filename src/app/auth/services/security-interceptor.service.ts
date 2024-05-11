import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { JwtPayload, jwtDecode } from "jwt-decode";
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SecurityInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestToForward = req;
    let session:string |any="";
    session=sessionStorage.getItem('session');
    if (session) {
      const accessToken = JSON.parse(session)['accessToken'];
      let decodedToken :any = jwtDecode(accessToken);
      const expirationDateInSeconds = decodedToken.exp;
      const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
      // Vérifier si le token a expiré
      if (expirationDateInSeconds < currentTimestampInSeconds) {
        //console.log('Le token a expiré.');
        sessionStorage.clear();
        this.router.navigate(['/login']);
        } else {
      requestToForward = req.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + accessToken
        }
      });
    }
  }
    return next.handle(requestToForward).pipe(map((event: HttpEvent<any>) => {
      return event;
    }));
  }



}


