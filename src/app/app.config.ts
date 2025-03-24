import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { SvgIconRegistryService, SvgLoader,SvgHttpLoader} from 'angular-svg-icon';
import { authInterceptor } from './interceptors/auth.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [ 
    provideHttpClient(withInterceptors([authInterceptor])), 
    provideRouter(routes),
    provideAnimations(), 
    { provide: SvgLoader, useClass: SvgHttpLoader },// 👈 Proveedor necesario para cargar los SVG
    SvgIconRegistryService
  ]
};
