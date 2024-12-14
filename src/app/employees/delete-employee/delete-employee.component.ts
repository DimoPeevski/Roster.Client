import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../../models/employee';
import { Router } from '@angular/router';
import { EmployeeModalService } from '../employee-modal-service.service';

@Component({
  selector: 'app-delete-employee',
  standalone: true,
  imports: [],
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css'],
})
export class DeleteEmployeeComponent implements OnInit {
  employee: Employee | null = null;

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private employeeModalService: EmployeeModalService
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

  deleteEmployee(): void {
    this.employeeService.deleteEmployee(this.employee!.id).subscribe(() => {
      this.employeeModalService.closeDeleteModal();
      this.router
        .navigateByUrl('/profile', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['/']);
        });
    });
  }

  cancelDeleteEmployee(): void {
    this.employeeModalService.closeDeleteModal();
    this.router.navigate(['/']);
  }
}
