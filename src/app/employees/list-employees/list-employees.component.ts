import { Component, OnInit } from '@angular/core';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../employee.service';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
import { EmployeeModalService } from '../employee-modal-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [EmployeeCardComponent, DeleteEmployeeComponent, CommonModule],
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css'],
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string = '';
  selectedEmployee: Employee | null = null;
  showDeleteConfirmModal: boolean = false;

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor(
    private employeeService: EmployeeService,
    private userService: UserService,
    private router: Router,
    private employeeModalService: EmployeeModalService
  ) {}

  ngOnInit(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.getAllEmployees();
    }

    this.employeeModalService.modalState$.subscribe((state) => {
      this.showDeleteConfirmModal = state;
    });
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
}
