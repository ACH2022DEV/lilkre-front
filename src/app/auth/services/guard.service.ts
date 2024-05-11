import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // si l'utilisateur est connecté et que son token est valide 
    // on fera la solution la plus simple pour l'instant mais pas sécurisé 
    // on va utiliser la session storage
    if(sessionStorage.getItem('session')){
      return true
    }
    this.router.navigate(['/login']);
    return false;
  }
 
}
