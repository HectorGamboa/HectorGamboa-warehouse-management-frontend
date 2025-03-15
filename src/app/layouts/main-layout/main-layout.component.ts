import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { Component, signal } from "@angular/core";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { HeaderComponent } from "../../shared/components/header/header.component";
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { SidebarService } from "../../shared/services/sidebar.service";


@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    CommonModule,
    FooterComponent,
    HeaderComponent,
    SidebarComponent
    ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  isChecked = signal(false);
  constructor(private sidebarService: SidebarService) {
    this.loadTheme(); // Cargar el tema guardado al iniciar
  }
  loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.isChecked.set(savedTheme === 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
  changeTheme() {
    this.isChecked.set(!this.isChecked);
    const newTheme = this.isChecked() ? 'dark' : 'light';
    
    // ✅ Guardar en localStorage y aplicar el nuevo tema
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }
  isOpen = signal(false);
  ngOnInit() {
    this.sidebarService.sidebarState$.subscribe(state => {
      this.isOpen.set(state); 
      console.log(this.isOpen());
      
    });
  }
 
}
