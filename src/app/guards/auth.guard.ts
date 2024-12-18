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
    const requestedPath = route.routeConfig?.path;

    // Redirect unauthenticated users from protected routes to /login
    if (!isLoggedIn) {
      console.log('AuthGuard: User not logged-in. Redirecting to /login');
      this.router.navigate(['/login']);
      return false;
    }

    // Restrict managers from accessing /add-manager
    if (requestedPath === 'add-manager' && userRole === 'Manager') {
      console.log(
        'AuthGuard: Managers cannot access /add-manager. Redirecting...'
      );
      this.router.navigate(['/employees']);
      return false;
    }

    return true;
  }
}
