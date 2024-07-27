import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCard, MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import {MatButton, MatIconButton} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {HeaderComponent} from "../../header/header.component";
import {StatisticsComponent} from "../../statistics/statistics.component";
import {SidebarComponent} from "../../sidebar/sidebar.component";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatGridList,
    MatGridTile,
    MatIcon,
    MatIconButton,
    MatDivider,
    FlexLayoutModule,
    CdkDropList,
    CdkDrag,
    MatButton,
    HeaderComponent,
    MatCardActions,
      StatisticsComponent,
      SidebarComponent,
      MatSidenavContainer,
      MatSidenav,
      MatSidenavContent,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent{
}
