import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject, signal } from '@angular/core';
import { catchError, single, switchMap, throwError } from 'rxjs';
import { showError } from '../functions/sweetalert-functions';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const token = authService.getAuthToken();
  
  if (!token) { //si no hay intentamos realizar la petición sin token
    return next(req);
  }

  const  authRequest = req.clone(
    {
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }
  );//clonamos la petición para no modificar la original

  return next(authRequest).pipe(
    catchError((error) => {
      return authService.getNewAccessToken().pipe(
        switchMap((res) => {
         //guardamos el nuevo token
         localStorage.setItem('accessToken', res.data.accessToken);
         localStorage.setItem('refreshToken', res.data.refreshToken);
          const newRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
          });
          return next(newRequest);
        }),
        catchError((error) => {
          console.log(error);
          let finalError = signal("");

          const message = error.error?.Message || "";
          const errores = error.error?.data?.errores || "";
          
          finalError.set(message + errores || error.statusText || "Error desconocido");
          if (error.status === 401) { 
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
           }
            showError(finalError());
            return throwError(() => finalError);
        })
      );
    })
  );
};
