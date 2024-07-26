import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { DashboardComponent } from '@task-manager/components';
import { HeaderComponent } from '../../libs/components/src/lib/header/header.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../../libs/login/src/lib/data-access-auth';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    DashboardComponent,
    HeaderComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'task-manager';

  isAuthenticated$: Observable<boolean>;

  constructor(private router: Router, private store: Store) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  ngOnInit() {
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/dashboard');
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }
}
