import { Component, Input } from '@angular/core';
import { Employee } from '../../models/employee';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EmployeeService } from '../employee.service';
import { EmployeeModalService } from '../employee-modal-service.service';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css'],
})
export class EmployeeCardComponent {
  @Input() employee!: Employee;

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private employeeModalService: EmployeeModalService
  ) {}

  editEmployee() {
    this.employeeService.setSelectedEmployee(this.employee);
    this.router.navigate(['/edit-employee']);
  }

  deleteEmployee() {
    this.employeeService.setSelectedEmployee(this.employee);
    this.employeeModalService.openDeleteModal();
  }
}
