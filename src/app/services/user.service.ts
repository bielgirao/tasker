import { Injectable } from '@angular/core';
import {Environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, tap, throwError} from "rxjs";
import {User, UserData} from "../types/user";
import {catchError} from "rxjs/operators";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${Environment.apiUrl}`;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  register(userData: UserData): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, userData).pipe(
      tap((response: any) => {
        this.authService.login({email: userData.email, password: userData.password});
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
