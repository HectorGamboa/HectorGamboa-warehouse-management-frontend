import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SidebarService } from  '../../services/sidebar.service';  

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  iconMenu = signal(true);
  constructor(private sidebarService: SidebarService) {}

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
    this.iconMenu.set(!this.iconMenu());
  }
}
