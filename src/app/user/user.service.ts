import { Injectable } from '@angular/core';
import { User, UserForAuth } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);
  private user$ = this.user$$.asObservable();

  USER_KEY = '[user]';
  user: UserForAuth | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<UserForAuth>('/api/auth/login', { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    this.http
      .post('/api/auth/logout', {}, { withCredentials: true })
      .subscribe({
        next: () => {
          this.user = null;
          this.user$$.next(null);
          console.log('Logout successful.');
        },
        error: (err) => {
          console.error('Logout error:', err);
        },
      });
  }

  getProfile() {
    return this.http
      .get<UserForAuth>('/api/auth/profile', { withCredentials: true })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  getProfileCard() {
    return this.http.get<User>('/api/auth/profile', { withCredentials: false });
  }

  addManager(email: string, password: string, rePassword: string) {
    return this.http
      .post<UserForAuth>('/api/auth/register', { email, password, rePassword })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  getLoggedUserRole(): Observable<string> {
    return this.http.get<string>('/api/auth/role', { withCredentials: true });
  }

  editManager() {}
  deleteManager() {}
}
