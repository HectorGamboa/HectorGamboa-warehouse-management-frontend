import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { GenericValidators } from '../../../../shared/validators/generic-validators';
import { FormUtils } from '../../../../shared/utils/form-utils';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule,CommonModule,RouterLink]})

export class LoginComponent {
  // Inicializacion de variables
  menssageError = signal("");
  private authService = inject(AuthService);
  router = inject(Router);
  showPassword = signal(false);
  formUtils = FormUtils;
  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  
  loginForm: FormGroup = this.fb.group({
    email: this.fb.control('', {
      validators: [Validators.required, GenericValidators.emailValidation],
      updateOn: 'change' // 🔥 Valida en cada letra que el usuario escribe
    }),
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
 
  validateField(fieldName: string) {
    const field = this.loginForm.get(fieldName);
    if (field) {
      field.markAsDirty(); // Asegura que el campo se considere "modificado"
      field.updateValueAndValidity(); // Vuelve a validar el campo  
    }
  }

  onSubmit(event: Event) {
    event.preventDefault(); // 🔥 Evita que el navegador haga un submit tradicional
    event.stopPropagation(); // Opcional: detiene eventos adicionales
    this.loginForm.markAllAsTouched();
    if(this.loginForm.invalid) {
      this.hasError.set(true);
      this.menssageError.set("Please check the form fields");
      return;
    }
    this.hasError.set(false);
    this.menssageError.set("");
    this.isPosting.set(true);
   
    const {email ="", password=""} = this.loginForm.value;
    this.authService.login(email, password).
    pipe(finalize(() => this.isPosting.set(false)))
    .subscribe({
      next: () => {        
        this.router.navigateByUrl("/dashboard");
      },
      error: (err) => {
        this.hasError.set(true);
        this.menssageError.set(err || "An unknown error occurred");
      }
    });
   
  }
}

