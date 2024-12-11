import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-delete-employee',
  standalone: true,
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css'],
})
export class DeleteEmployeeComponent implements OnInit {
  @Input() employee!: Employee;
  @Output() delete = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    console.log('Received employee data:', this.employee);
  }

  onDelete(): void {
    this.employeeService.deleteEmployee(this.employee.id).subscribe(
      () => {
        this.delete.emit();
      },
      (error) => {
        console.error('Error deleting employee:', error);
      }
    );
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
