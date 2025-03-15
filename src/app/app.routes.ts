import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';


export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' }, // 🔹 Página inicial = Login
    { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
    {path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)},
    { path: '**', component: NotFoundComponent, data: { title: "Not Found" } } // ✅ Página 404
    
];