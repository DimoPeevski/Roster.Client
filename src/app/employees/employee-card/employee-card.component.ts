import { Component, Input } from '@angular/core';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css',
})
export class EmployeeCardComponent {
  @Input() employee: Employee = {
    id: '',
    firstName: 'John',
    lastName: 'Doe',
    experienceLevel: 'Junior',
    verifiedExperienceLevel: false,
    team: 'Apps & Services',
    startDate: '2022-01-15',
    salaryLastRaise: '2023-01-01',
    salary: 3000,
    paidLeave: 20,
    medicalInsurance: true,
    profileAvatarUrlPath:
      'https://cdn.peevski.net/images/roster/avatar-default.jpg',
  };

  prepareForEditEmployee() {
    //
  }

  prepareForDeleteEmployee() {
    //
  }
}
