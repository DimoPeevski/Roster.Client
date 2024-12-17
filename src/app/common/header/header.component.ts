import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';

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

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.userRole$.subscribe((role) => {
      this.userRole = role;
    });
  }
}
