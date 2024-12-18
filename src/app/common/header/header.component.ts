import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  userRole: string = '';
  profileAvatar: string = '';

  constructor(private userService: UserService) {}

  setTheme(theme: string) {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }

  onThemeChange(event: Event) {
    const selectedTheme = (event.target as HTMLSelectElement).value;
    this.setTheme(selectedTheme);
  }

  ngOnInit(): void {
    this.userService.userRole$.subscribe((role) => {
      this.userRole = role;
      if (role === 'Admin') {
        this.profileAvatar =
          'https://cdn.peevski.net/images/roster/avatar-admin.jpg';
      } else {
        this.profileAvatar =
          'https://cdn.peevski.net/images/roster/avatar-manager.jpg';
      }
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.setTheme(savedTheme);
    }
  }
}
