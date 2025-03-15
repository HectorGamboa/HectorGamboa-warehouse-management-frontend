import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {
  isChecked = false;
  constructor() {
    this.loadTheme(); // Cargar el tema guardado al iniciar
  }
  loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.isChecked = savedTheme === 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
  changeTheme() {
    this.isChecked = !this.isChecked;
    const newTheme = this.isChecked ? 'dark' : 'light';
    
    // ✅ Guardar en localStorage y aplicar el nuevo tema
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }
}
