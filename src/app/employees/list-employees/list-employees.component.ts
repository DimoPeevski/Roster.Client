import { Component, OnInit } from '@angular/core';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [
    EmployeeCardComponent,
  ],
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.css'
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[] = [];

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    //
  }







  private formatDateForDisplay(date: string | Date | null): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
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
