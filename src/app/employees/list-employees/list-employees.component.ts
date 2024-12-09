import { Component, OnInit } from '@angular/core';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../employee.service';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [EmployeeCardComponent],
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.css',
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[] = [];
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor(
    private employeeService: EmployeeService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.getAllEmployees();
    }
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  private formatDateForDisplay(date: string | Date | null): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  private formatDateForInput(date: string | Date | null): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  private formatDateForServer(date: string | Date | null): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString();
  }
}
