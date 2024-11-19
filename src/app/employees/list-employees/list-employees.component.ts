import { Component } from '@angular/core';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';

@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [
    EmployeeCardComponent,
    EditEmployeeComponent,
    AddEmployeeComponent,
    DeleteEmployeeComponent
  ],
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.css'
})
export class ListEmployeesComponent {

}
