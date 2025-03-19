import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-error400',
  imports: [AngularSvgIconModule, ButtonComponent],
  templateUrl: './error400.component.html',
  styleUrl: './error400.component.css'
})
export class Error400Component {
  constructor(private router:Router) {
    
   }

  goHome() {
    this.router.navigate(['/']);
  }

}
