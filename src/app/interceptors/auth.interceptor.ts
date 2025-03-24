import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../shared/services/auth.service';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { showError } from '../shared/functions/sweetalert-functions';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const token = authService.getAuthToken();
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
         localStorage.setItem('accessToken', res.accessToken);
         localStorage.setItem('refreshToken', res.refreshToken);
          const newRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${res.accessToken}`,
            },
          });
          return next(newRequest);
        }),
        catchError((error) => {
            const finalError = error.error.message || error.statusText;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            showError(finalError);
            return throwError(() => finalError);
        })
      );
    })
  );
};
