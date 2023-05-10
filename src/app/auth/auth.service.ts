import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { map, Observable, tap, throwError } from 'rxjs';
import { LoginCredentials } from '../models/login-credentials';
import { LoginResponse } from '../models/login-response';
import { SignUp } from '../models/sign-up';

const AUTH_API = 'http://localhost:8080/api/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUsername(),
  };

  constructor(private http: HttpClient) { }

  signup(signup: SignUp): Observable<any> {
    return this.http.post(AUTH_API + '/signup', signup, {responseType: 'text'});
  }

  login(loginCredientials: LoginCredentials): Observable<boolean> {
    return this.http
      .post<LoginResponse>(AUTH_API + '/login', loginCredientials)
      .pipe(
        map((data) => {
          sessionStorage.setItem(
            'authenticationToken',
            data.authenticationToken
          );
          sessionStorage.setItem('username', data.username);
          sessionStorage.setItem('refreshToken', data.refreshToken);
          sessionStorage.setItem('expiresAt', data.expiresAt.toString());

          this.loggedIn.emit(true);
          this.username.emit(data.username);

          return true;
        })
      );
  }

  refreshToken() {
    return this.http
      .post<LoginResponse>(
        AUTH_API + '/refresh/token',
        this.refreshTokenPayload
      )
      .pipe(
        tap((response) => {
          sessionStorage.setItem(
            'authenticationToken',
            response.authenticationToken
          );
          sessionStorage.setItem('expiresAt', response.expiresAt.toString());
        })
      );
  }

  logout() {
    this.http
      .post(AUTH_API + '/logout', this.refreshTokenPayload, {
        responseType: 'text',
      })
      .subscribe({
        error: (error) => throwError(() => new Error(error)),
        next: (data) => console.log(data),
      });

    sessionStorage.clear();
  }

  getUsername(): string {
    const username = sessionStorage.getItem('username');

    if (username != null) return username;
    else {
      return '';
    }
  }

  getJwtToken() {
    return sessionStorage.getItem('authenticationToken');
  }

  getRefreshToken() {
    return sessionStorage.getItem('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
