import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailDirective } from '../../directives/email.directive';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, EmailDirective, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) {}

  addManager(form: NgForm) {
    if (form.invalid) {
      console.error('Invalid form!');
      return;
    }

    this.userService.addManager();
    this.router.navigate(['/']);
  }
}
