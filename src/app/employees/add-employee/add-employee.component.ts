import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  today: string = '';

  employee: Employee = {
    id: '',
    firstName: '',
    lastName: '',
    experienceLevel: 'Intern',
    startDate: this.formatDateForInput(new Date()),
    team: '',
    salary: 500,
    salaryLastRaise: this.formatDateForInput(new Date()),
    medicalInsurance: true,
    paidLeave: 25,
    profileAvatarUrlPath:
      'https://cdn.peevski.net/images/roster/avatar-default.jpg',
    verifiedExperienceLevel: false,
  };

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const now = new Date();
    this.today = this.formatDateForInput(now);
  }

  addEmployee(form: NgForm) {
    if (form.invalid) {
      console.error('Invalid form!');
      return;
    }

    const {
      firstName,
      lastName,
      experienceLevel,
      verifiedExperienceLevel,
      team,
      startDate,
      salaryLastRaise,
      salary,
      paidLeave,
      medicalInsurance,
    } = form.value;

    const formEmployee: Employee = {
      id: crypto.randomUUID(),
      firstName,
      lastName,
      experienceLevel,
      verifiedExperienceLevel,
      team,
      startDate: this.formatDateForBackend(new Date(startDate)),
      salaryLastRaise: this.formatDateForBackend(new Date(salaryLastRaise)),
      salary,
      paidLeave,
      medicalInsurance,
      profileAvatarUrlPath:
        'https://cdn.peevski.net/images/roster/avatar-default.jpg',
    };

    this.employeeService.addEmployee(formEmployee).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  cancelAddEmployee() {
    this.router.navigate(['/']);
  }

  formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  formatDateForBackend(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    const milliseconds = ('0000000' + date.getMilliseconds()).slice(-7);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }
}
