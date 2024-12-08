import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userSevice: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.userSevice.isLogged) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
