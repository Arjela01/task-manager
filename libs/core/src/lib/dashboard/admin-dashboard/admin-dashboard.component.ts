import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardActions } from '@angular/material/card';
import { StatisticsComponent } from '../../statistics/statistics.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardActions,
    StatisticsComponent,
    SidebarComponent,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    RouterOutlet,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {}
