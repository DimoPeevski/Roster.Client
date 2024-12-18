import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.userService.isLogged;
    const requestedPath = route.routeConfig?.path;

    // Restrict logged-in users to access /login page
    if (requestedPath === 'login' && isLoggedIn) {
      console.log(
        'AuthGuard: Logged-in users cannot access /login. Redirecting...'
      );
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
