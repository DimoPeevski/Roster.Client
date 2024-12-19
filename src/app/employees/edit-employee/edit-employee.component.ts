import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Employee } from '../../models/employee';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { NamesDirective } from '../../directives/name.directive';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [FormsModule, CommonModule, NamesDirective],
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  employee: Employee | null = null;
  startDate: string = '';
  lastSalaryRaise: string = '';

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeService.getSelectedEmployee().subscribe({
      next: (employee) => {
        if (employee) {
          this.employee = employee;
          this.startDate = this.formatDateForInput(
            new Date(employee.startDate)
          );
          this.lastSalaryRaise = this.formatDateForInput(
            new Date(employee.salaryLastRaise)
          );
        } else {
          const savedEmployee = localStorage.getItem('selectedEmployee');
          if (savedEmployee) {
            this.employee = JSON.parse(savedEmployee);
            this.startDate = this.formatDateForInput(
              new Date(this.employee!.startDate)
            );
            this.lastSalaryRaise = this.formatDateForInput(
              new Date(this.employee!.salaryLastRaise)
            );
          } else {
            this.router.navigate(['/']);
          }
        }
      },
      error: (err) => {
        console.error('Error fetching employee:', err);
        this.router.navigate(['/']);
      },
    });
  }

  editEmployee(editEmployeeForm: NgForm): void {
    if (editEmployeeForm.invalid) {
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
    } = editEmployeeForm.value;

    const formEmployee: Employee = {
      id: this.employee?.id ?? '',
      firstName,
      lastName,
      experienceLevel,
      verifiedExperienceLevel:
        verifiedExperienceLevel === 'true' || verifiedExperienceLevel === true,
      team,
      email: '',
      startDate: this.formatDateForBackend(startDate),
      salaryLastRaise: this.formatDateForBackend(salaryLastRaise),
      salary,
      paidLeave,
      medicalInsurance:
        medicalInsurance === 'true' || medicalInsurance === true,
      profileAvatarUrlPath:
        this.employee?.profileAvatarUrlPath ??
        'https://cdn.peevski.net/images/roster/avatar-default.jpg',
    };

    this.employeeService.editEmployee(formEmployee).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  cancelEditEmployee(): void {
    this.router.navigate(['/']);
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
