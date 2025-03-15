import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AuthLayoutComponent } from '../../layouts/auth-layout/auth-layout.component';

const routes: Routes = [
  { 
    path: '', 
    component: AuthLayoutComponent, 
    children: [
      { path: 'login', component: LoginComponent ,data:{title:"Login"}},
      { path: 'register', component: RegisterComponent , data:{title:"Register"} },
      { path: 'forgot-password', component: ForgotPasswordComponent, data:{title:"Forget Password"} },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule] 
})
export class AuthRoutingModule {}
