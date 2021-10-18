import { createPlatform, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Credential } from 'src/app/core/models/credentials';
import { ErrorResponse } from '../models/error-response';

@Injectable()
export class AuthService {
    BASE_URL = 'api/login';
    USERNAME_KEY = 'userName';
    TOKEN_KEY = 'token';

    constructor(private http: HttpClient, private router: Router) { }

    get name(): string | null {
        return localStorage.getItem(this.USERNAME_KEY);
    }

    get isAuthenticated(): boolean {
        return !!localStorage.getItem(this.USERNAME_KEY);
    }

    login(credentials: Credential) {
        return this.http.post<any>(`${this.BASE_URL}`, credentials)
        // .subscribe(res => this.authenticate(res), error => this.handleError('login'))
        .pipe(
            tap(res => this.authenticate(res)),
            catchError(err => this.handleError(err, 'login'))
        );
    }

    logout() {
        console.log("logout")
        localStorage.removeItem(this.USERNAME_KEY);
        localStorage.removeItem(this.TOKEN_KEY);
        this.router.navigate(['/login']);
    }

    // store token and username and navigate to homepage
    authenticate(res: any) {
        console.log(res);
        localStorage.setItem(this.TOKEN_KEY, res.token);
        localStorage.setItem(this.USERNAME_KEY, res.username);
        this.router.navigate(['/']);
    }

    private handleError<T>(errorResponse: HttpResponse<ErrorResponse>, operation = 'operation') {
        // TODO: send the error to remote logging infrastructure
        console.error(errorResponse); // log to console instead

        // Let the app keep running by returning error.
        return of(errorResponse.body);
    }
}
