import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {
  today: string = '';

  ngOnInit(): void {
    const now = new Date();
    this.today = now.toISOString().split('T')[0];
  }
}
