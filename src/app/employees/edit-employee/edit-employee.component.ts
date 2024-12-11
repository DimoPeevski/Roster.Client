import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Employee } from '../../models/employee';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  employee: Employee | null = null;

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeService.getSelectedEmployee().subscribe({
      next: (employee) => {
        if (employee) {
          this.employee = employee;
        } else {
          const savedEmployee = localStorage.getItem('selectedEmployee');
          if (savedEmployee) {
            this.employee = JSON.parse(savedEmployee);
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

  editEmployee(editEmployeeForm: NgForm) {
    if (editEmployeeForm.invalid) {
      console.error('Invalid form!');
      return;
    }
  }

  cancelEditEmployee(): void {
    this.router.navigate(['/']);
  }
}
