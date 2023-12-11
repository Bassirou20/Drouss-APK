import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../../authentication/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard  {

  constructor(private authService: AuthService, private router: Router,private location: Location) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let url: string = state.url;
      return this.checkUserLogin(route, url);
  }


  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }






  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    let roles = route.data["roles"] as Array<string>;


    if (this.authService.isLoggedIn()) {

      const userRole = this.authService.getConnected().role_id;
      if (route.data["roles"] && route.data["roles"].indexOf(userRole.libelle) == -1) {
        console.log('if')

        this.location.back();
        return false;
      }
      return true;
    }

    this.router.navigate(['/logout'], { queryParams: { returnUrl: url }});
    return false;
  }

}
