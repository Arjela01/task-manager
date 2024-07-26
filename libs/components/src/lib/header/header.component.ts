import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  logout(): void {
    // Implement your logout logic here
    // For example, clear user data and redirect to the login page
    // localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
