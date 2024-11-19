import { Component } from '@angular/core';
import { EmployeeCardComponent } from '../employees/employee-card/employee-card.component';
import { AddEmployeeComponent } from '../employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from '../employees/edit-employee/edit-employee.component';
import { RouterLink } from '@angular/router';
import { ListEmployeesComponent } from "../employees/list-employees/list-employees.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterLink,
    ListEmployeesComponent
],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
