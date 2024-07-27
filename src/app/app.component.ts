import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthFacade, LoginResponse} from '../../libs/login/src/lib/data-access-auth';
import { NxWelcomeComponent } from './nx-welcome.component';
import { EmployeeDashboardComponent } from '@task-manager/components';
import { HeaderComponent } from '../../libs/components/src/lib/header/header.component';
import {User} from "../../libs/login/src/lib/data-access-auth/models/user.model";

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    EmployeeDashboardComponent,
    HeaderComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'task-manager';

  isAuthenticated$: Observable<boolean>;
  userRole$: Observable<any>;

  constructor(private router: Router, private authFacade: AuthFacade) {
    this.isAuthenticated$ = this.authFacade.isAuthenticated$;
    this.userRole$ = this.authFacade.user$;
  }

  ngOnInit() {
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        // Navigate based on the user's role
        this.userRole$.subscribe((data) => {
          if (data.user.role === 'admin') {
            this.router.navigateByUrl('/admin-dashboard');
          } else if (data.user.role === 'employee') {
            this.router.navigateByUrl('/employee-dashboard');
          } else {
            console.error('Unknown user role:', data.user.role);
            // Optionally, handle unknown roles or show an error
            this.router.navigateByUrl('/login');
          }
        });
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }
}
