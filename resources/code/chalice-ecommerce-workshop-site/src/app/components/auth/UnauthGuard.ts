import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Auth } from "aws-amplify";


@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
  constructor( private router: Router ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return Auth.currentAuthenticatedUser().then(() => { 
        this.router.navigate(['']);
        return false;
    }).catch(() => {
        return true;
    });
  }
}