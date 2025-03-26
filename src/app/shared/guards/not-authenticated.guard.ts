import { inject } from '@angular/core';
import { CanMatchFn, Router, } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const NotAuthenticatedGuard: CanMatchFn =  (route, segments) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const isAuthenticated =  authService.authStatus();
  
      if(isAuthenticated == "authenticated" ){
      router.navigate(['/dashboard']);
    }

    return true ;
  };