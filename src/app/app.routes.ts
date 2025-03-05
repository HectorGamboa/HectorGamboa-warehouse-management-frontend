import { provideRouter, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';

export const routes: Routes = [
    { path: '', component: LoginComponent,data:{title:"Login"}}, // Login por default
    { path: '**', component: NotFoundComponent,data:{title:"Not found"}} //Not Found
];
export const appRoutingProviders=[
    provideRouter(routes)
]
    
