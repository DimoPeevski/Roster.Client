import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  constructor(private userServer: UserService, private router: Router) {}

  logout() {
    this.userServer.logout();
    this.router.navigate(['/']);
  }

  cancelLogout() {
    this.router.navigate(['/']);
  }
}
