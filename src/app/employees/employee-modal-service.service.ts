import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeModalService {
  private modalState = new BehaviorSubject<boolean>(false);

  get modalState$() {
    return this.modalState.asObservable();
  }

  openDeleteModal() {
    this.modalState.next(true);
  }

  closeDeleteModal() {
    this.modalState.next(false);
  }
}
