import { HttpClient } from "@angular/common/http";
import {  Injectable, signal,inject, computed  } from "@angular/core";
import { environment } from "../../../environments/environment";
import { AuthResponse } from "../interfaces/auth/auth.response";
import { catchError, map, of, tap, throwError } from "rxjs";
import { ApiResponse } from "../interfaces/api/api.response";
import { ApiErrorResponse } from "../interfaces/api/api_error.response";
import { handleApiError } from "../utils/error-handler";
type AuthStatus ="cheking"| "authenticated" | "unauthenticated";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authStatus: AuthStatus = "cheking";
    
    private _token = signal<string|null>(null);
    private _refreshToken = signal<string|null>(null);

    private http = inject(HttpClient); 

    authStatus = computed<AuthStatus>(() => {
        if (this._authStatus === "cheking") return "cheking";
        return this._refreshToken()!=null ? "authenticated" : "unauthenticated";
    });
     

    token = computed<string|null>(() => this._token());
    refreshToken = computed<string|null>(() => this._refreshToken());

    constructor() {
        this.restoreAuthState(); // Se ejecuta solo al inicio
    }

    private restoreAuthState() {
        if (this._authStatus !== "cheking") return; // Evita múltiples llamadas innecesarias
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        console.log(accessToken);
        if ( accessToken && refreshToken) {
            this._token.set(accessToken);
            this._refreshToken.set(refreshToken);
            this._authStatus = "authenticated";
        } else {
            this._authStatus = "unauthenticated";
        }
    }

    //solicitudes al servidor
    login(email: string, password: string) {
        return this.http.post<ApiResponse<AuthResponse>>(`${environment.API_URL}/auth/login`, 
            { email, password })
            .pipe(
                tap(response => {  
                    this._authStatus = "authenticated";
                    this._token.set(response.data.accessToken);
                    this._refreshToken.set(response.data.refreshToken);
                     localStorage.setItem('accessToken', response.data.accessToken);
                     localStorage.setItem('refreshToken', response.data.refreshToken);
                    
                }),
                map(() => true), // Si todo va bien, devuelve true
                catchError(handleApiError)
            );
    }
    
    logout() {
        this._refreshToken.set(this.getRefreshToken());
        return this.http.post<ApiResponse<boolean>>(`${environment.API_URL}/auth/revoke-refreshtoken`, {
            refreshToken: this._refreshToken()
         })
            .pipe(
                tap((response) => {
                    this._authStatus = "unauthenticated";
                    this._token.set(null);
                    this._refreshToken.set(null);
                    localStorage.removeItem('userIdentity');
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                }),
                map(() => true), // Si todo va bien, devuelve true
                catchError(handleApiError)
            );
    }
    //fin solicitudes al servidor
    
    
    
    getNewAccessToken() {
        this._refreshToken.set(this.getRefreshToken());
        return this.http.post<ApiResponse<AuthResponse>>(
            `${environment.API_URL}/auth/login-refreshtoken`, 
            {refreshToken: this._refreshToken()});
    }

    getAuthToken(){
        return localStorage.getItem('accessToken') || '';
    }

    getRefreshToken(){
        return localStorage.getItem('refreshToken') || '';
    }

}