import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ManagerProfile, User } from '../../models/user';
import { TruncatePipe } from '../../shared/truncate/truncate.pipe';

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
  isEditMode: boolean = false;
  formDate: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getProfileCard().subscribe({
      next: (userProfile) => {
        if (userProfile) {
          this.userProfile = userProfile;
          this.formDate = this.formatDateForInput(
            new Date(userProfile.registrationDate)
          );
          this.userService.getLoggedUserRole().subscribe({
            next: (role) => {
              this.role = role;
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

  editProfile(editProfileForm: NgForm): void {
    if (editProfileForm.invalid) {
      console.error('Invalid form!');
      return;
    }

    const { firstName, lastName, email, phoneNumber, registerDate } =
      editProfileForm.value;

    const formUser: ManagerProfile = {
      id: this.userProfile!.id,
      firstName,
      lastName,
      registrationDate: registerDate,
      email: email,
      phoneNumber: phoneNumber,
    };

    this.userService.editManager(formUser).subscribe(() => {
      this.router.navigate(['/profile']);
    });
  }

  changeEditMode() {
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
  }

  private formatDateForBackend(date: string): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${(
      '0' + d.getDate()
    ).slice(-2)} 00:00:00.0000000`;
  }

  private formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
