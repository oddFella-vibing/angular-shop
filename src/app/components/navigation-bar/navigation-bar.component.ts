import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent {
  navbarOpen = false;
  constructor(public authService: AuthService) {}

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
