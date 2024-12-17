import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.userService.isLogged;
    const userRole = this.userService.userRole;

    if (route.routeConfig?.path === 'login' && isLoggedIn) {
      console.log(
        'AuthGuard: Redirecting logged-in user from /login to homepage'
      );
      this.router.navigate(['/']);
      return false;
    }

    if (route.routeConfig?.path === 'add-manager' && userRole === 'Manager') {
      console.log(
        'AuthGuard: Managers cannot access /add-manager, redirecting...'
      );
      this.router.navigate(['/']);
      return false;
    }

    if (isLoggedIn) {
      return true;
    }

    console.log('AuthGuard: User is not logged in, redirecting to /login');
    this.router.navigate(['/login']);
    return false;
  }
}
