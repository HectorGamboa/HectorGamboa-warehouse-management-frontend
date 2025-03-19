import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { SvgIconRegistryService, SvgLoader,SvgHttpLoader} from 'angular-svg-icon';
export const appConfig: ApplicationConfig = {
  providers: [ 
    provideHttpClient(), 
    provideRouter(routes),
    provideAnimations(), 
    { provide: SvgLoader, useClass: SvgHttpLoader },// 👈 Proveedor necesario para cargar los SVG
    SvgIconRegistryService
  ]
};
