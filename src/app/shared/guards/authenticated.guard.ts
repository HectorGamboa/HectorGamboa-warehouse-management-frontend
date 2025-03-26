import { CanMatchFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const AuthenticatedGuard: CanMatchFn =  (route, segments) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const isAuthenticated =  authService.authStatus();
    if(isAuthenticated == "unauthenticated" ){
      router.navigate(['/auth']);
    } 

    return true ;
  };