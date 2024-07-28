import { Component } from '@angular/core';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatListItem, MatNavList } from '@angular/material/list';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { AuthFacade } from '@task-manager/auth';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [
    MatSidenavContainer,
    MatToolbar,
    MatNavList,
    MatSidenav,
    MatListItem,
    RouterLink,
    MatIcon,
    RouterOutlet,
    MatIconButton,
    MatSidenavContent,
    RouterLinkActive,
    MatTooltip,
  ],
})
export class SidebarComponent {
  constructor(private router: Router, private authFacade: AuthFacade) {}
  logout(): void {
    this.authFacade.logout();
    this.router.navigate(['/login']);
  }
}
