import { HttpClient } from "@angular/common/http";
import {  Injectable, signal,inject, computed  } from "@angular/core";
import { environment } from "../../../environments/environment";
import { User } from "../interfaces/auth/user.interface";
import { AuthResponse } from "../interfaces/auth/auth.response";
import { catchError, map, of, tap, throwError } from "rxjs";
type AuthStatus ="cheking"| "authenticated" | "unauthenticated";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authStatus: AuthStatus = "cheking";
    private _user =  signal<User|null>(null);
    private _token = signal<string|null>(null);
    private _refreshToken = signal<string|null>(null);

    private http = inject(HttpClient); 

    authStatus = computed<AuthStatus>(() => {
        if (this._authStatus === "cheking") return "cheking";
        return this._user() ? "authenticated" : "unauthenticated";
    });
    

    user = computed<User|null>(() => this._user());
    token = computed<string|null>(() => this._token());
    refreshToken = computed<string|null>(() => this._refreshToken());

    login(email: string, password: string) {
        return this.http.post<AuthResponse>(`${environment.API_URL}/auth/login`, 
            { email, password })
            .pipe(
                tap(response => {   
                    this._authStatus = "authenticated";
                    this._user.set(response.user);
                    this._token.set(response.token);
                    this._refreshToken.set(response.refreshToken);
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('refreshToken', response.refreshToken);
                    
                }),
                map(() => true), // Si todo va bien, devuelve true
                catchError((error: any) => {
                    this._user.set(null);
                    this._token.set(null);
                    this._refreshToken.set(null);
                    this._authStatus = "unauthenticated";
    
                    // Devolvemos el error del backend en lugar de ocultarlo
                    return throwError(() => error.error);
                })
            );
    }
    
}