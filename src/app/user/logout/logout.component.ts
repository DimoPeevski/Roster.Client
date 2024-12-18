import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-logout',
  standalone: true,
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnDestroy {
  private logoutSubscription: Subscription = new Subscription();

  constructor(private userService: UserService, private router: Router) {}

  logout(): void {
    const logoutSub = this.userService.logout(() => {
      this.router.navigate(['/login']);
    });

    this.logoutSubscription.add(logoutSub);
  }

  cancelLogout(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.logoutSubscription.unsubscribe();
  }
}
