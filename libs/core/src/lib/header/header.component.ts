import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@task-manager/auth';

@Component({
  selector: 'lib-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router, private authFacade: AuthFacade) {}

  logout(): void {
    this.authFacade.logout();
    this.router.navigate(['/login']);
  }
}
