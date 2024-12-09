import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  get isLogged(): boolean {
    return true;
  }

  constructor() {
    try {
    } catch (error) {}
  }

  login() {}
  addManager() {}
}
