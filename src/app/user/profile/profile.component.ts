import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { TruncatePipe } from '../../shared/truncate.pipe';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, TruncatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userProfile: User | null = null;
  role: String | null = null;
  isEditMode: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getProfileCard().subscribe({
      next: (userProfile) => {
        if (userProfile) {
          this.userProfile = userProfile;

          this.userService.getLoggedUserRole().subscribe({
            next: (role) => {
              this.role = role;
              console.log(role);
            },
            error: (error) => {
              console.error('Error fetching user role:', error);
            },
          });
        }
      },
      error: (error) => {
        console.error('Error fetching user profile:', error);
      },
    });
  }

  editProfile(form: NgForm) {
    return;
  }
}
