import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { GenericValidators } from '../../../../shared/validators/generic-validators';
import { FormUtils } from '../../../../shared/utils/form-utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule,CommonModule]})

export class LoginComponent {
  // Inicializacion de variables
  showPassword = false;
  formUtils = FormUtils;
  fb = inject(FormBuilder);
  loginForm:FormGroup = this.fb.group({
    email: ['', [Validators.required, GenericValidators.emailValidation]],
    password: ['', Validators.required]
  });

}

