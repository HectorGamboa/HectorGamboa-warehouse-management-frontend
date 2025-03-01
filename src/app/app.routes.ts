import { provideRouter, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
         { path: '', component: NotFoundComponent }, // Ruta temporal para ver el 404
        { path: '**', component: NotFoundComponent } // Ruta 404
];

export const appRoutingProviders=[
    provideRouter(routes)
]
    
