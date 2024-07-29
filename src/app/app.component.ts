
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AuthFacade } from '@task-manager/auth';

@Component({
  standalone: true,
  imports: [
    RouterModule,
  ],
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
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
        this.userRole$.subscribe((data) => {
          if (data.user.role === 'admin') {
            this.router.navigateByUrl('/admin-dashboard');
          } else if (data.user.role === 'employee') {
            this.router.navigateByUrl('/employee-dashboard');
          } else {
            this.router.navigateByUrl('/login');
          }
        });
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }
}
