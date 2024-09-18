import { Injectable } from '@angular/core';
import { Environment } from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = `${Environment.apiUrl}`;
  private accessToken: string | null = null;
  private expirationTimeInMinutes: number = 120;
  private tokenRefreshTimeout: any;

  private authenticated = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loadToken();
  }

  get isAuthenticated(): Observable<boolean> {
    return this.authenticated.asObservable();
  }

  private loadToken(): void {
    const token = localStorage.getItem('tasker@1.0.0-access_token');
    if (token) {
      this.accessToken = token;
      this.authenticated.next(true);
    }
  }

  startTokenTimer(): void {
    const expirationTimeInSeconds = this.expirationTimeInMinutes * 60 * 1000;
    this.tokenRefreshTimeout = setTimeout(() => {
      this.refreshToken().subscribe();
    }, expirationTimeInSeconds - (5 * 60 * 1000));
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        this.accessToken = response.token;
        if(this.accessToken) {
          localStorage.setItem('tasker@1.0.0-access_token', this.accessToken);
          this.authenticated.next(true);
          this.startTokenTimer();
        }
      }),
      catchError((error) => {
        this.accessToken = null;
        localStorage.removeItem('tasker@1.0.0-access_token');
        this.authenticated.next(false);
        this.stopTokenTimer();
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.stopTokenTimer();
    this.authenticated.next(false);
    this.accessToken = null;
    localStorage.removeItem('tasker@1.0.0-access_token');
    if (this.getToken()) {
      this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
        next: () => {
          this.snackBar.open('Logged out successfully.', undefined, {duration: 3000});
        },
        error: (error) => {
          console.error('Logout error:', error);
        },
      });
    }
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.accessToken;
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${this.apiUrl}/refresh-token`, {}).pipe(
      tap((response: any) => {
        this.accessToken = response.token;
        if (this.accessToken) {
          localStorage.setItem('tasker@1.0.0-access_token', this.accessToken);
          this.authenticated.next(true);
          this.startTokenTimer();
        }
      }),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  stopTokenTimer(): void {
    if (this.tokenRefreshTimeout) {
      clearTimeout(this.tokenRefreshTimeout);
      this.tokenRefreshTimeout = null;
    }
  }

}
