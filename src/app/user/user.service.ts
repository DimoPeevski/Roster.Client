import { Injectable } from '@angular/core';
import { ManagerProfile, User, UserForAuth } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$$ = new BehaviorSubject<UserForAuth | null>(
    JSON.parse(localStorage.getItem('[user]') || 'null')
  );
  private user$ = this.user$$.asObservable();

  private userRole$$ = new BehaviorSubject<string>(
    localStorage.getItem('[role]') || ''
  );
  userRole$ = this.userRole$$.asObservable();

  user: UserForAuth | null = this.user$$.value;
  userRole: string = this.userRole$$.value;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.user$.subscribe((user) => {
      this.user = user;
    });
    this.userRole$.subscribe((role) => {
      this.userRole = role;
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<UserForAuth>('/api/auth/login', { email, password })
      .pipe(
        tap((user) => {
          this.user$$.next(user);
          localStorage.setItem('[user]', JSON.stringify(user));
          this.getLoggedUserRole().subscribe((role) => {
            this.userRole$$.next(role);
            localStorage.setItem('[role]', role);
            console.log('Login successful.');
          });
        })
      );
  }

  logout(onSuccess: () => void): void {
    this.http
      .post('/api/auth/logout', {}, { withCredentials: true })
      .subscribe({
        next: () => {
          this.user = null;
          this.user$$.next(null);
          this.userRole$$.next('');
          localStorage.removeItem('[user]');
          localStorage.removeItem('[role]');

          console.log('Logout successful.');

          onSuccess();
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
    return this.http.get<User>('/api/auth/profile', { withCredentials: true });
  }

  addManager(email: string, password: string, rePassword: string) {
    return this.http
      .post<UserForAuth>('/api/auth/register', { email, password, rePassword })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  getLoggedUserRole(): Observable<string> {
    return this.http
      .get<{ role: string }>('/api/auth/role', { withCredentials: true })
      .pipe(
        map((response) => {
          this.userRole = response.role;
          return response.role;
        })
      );
  }

  editManager(user: ManagerProfile): Observable<void> {
    return this.http.put<void>(`/api/auth/users/${user.id}`, user);
  }

  deleteManager() {
    //
  }
}
