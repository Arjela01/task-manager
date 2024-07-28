import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardActions,
} from '@angular/material/card';
import {HeaderComponent} from "../../header/header.component";
import {StatisticsComponent} from "../../statistics/statistics.component";
import {SidebarComponent} from "../../sidebar/sidebar.component";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
    imports: [
        CommonModule,
        HeaderComponent,
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
export class AdminDashboardComponent{
}
