import { Routes } from '@angular/router';
import { Error400Component } from './shared/components/error400/error400.component';


export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' }, // 🔹 Página inicial = Login
    { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
    {path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)},
    { path: '**', component: Error400Component, data: { title: "Not Found" } } // ✅ Página 404
    
];