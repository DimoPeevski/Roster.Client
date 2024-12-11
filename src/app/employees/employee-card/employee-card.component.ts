import { Component, Input } from '@angular/core';
import { Employee } from '../../models/employee';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EmployeeService } from '../employee.service';

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
    private employeeService: EmployeeService
  ) {}

  editEmployee() {
    this.employeeService.editEmployee(this.employee).subscribe(() => {
      this.router.navigate(['/edit-employee'], {
        state: { employee: this.employee },
      });
    });
  }

  deleteEmployee() {
    //
  }
}
