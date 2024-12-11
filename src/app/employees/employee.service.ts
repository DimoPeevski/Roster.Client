import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Employee } from '../models/employee';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = '/api/employees';
  private selectedEmployeeSubject = new BehaviorSubject<Employee | null>(null);

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching employees:', error);
        return of([]);
      })
    );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/create`, employee);
  }

  editEmployee(employee: Employee): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${employee.id}`, employee);
  }

  deleteEmployee(employeeId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${employeeId}`);
  }

  setSelectedEmployee(employee: Employee): void {
    this.selectedEmployeeSubject.next(employee);
    localStorage.setItem('selectedEmployee', JSON.stringify(employee));
  }

  getSelectedEmployee(): Observable<Employee | null> {
    const savedEmployee = localStorage.getItem('selectedEmployee');
    if (savedEmployee && !this.selectedEmployeeSubject.value) {
      this.selectedEmployeeSubject.next(JSON.parse(savedEmployee));
    }
    return this.selectedEmployeeSubject.asObservable();
  }
}
