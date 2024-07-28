import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskBoardComponent } from '@task-manager/task';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'lib-employee-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TaskBoardComponent,
    HeaderComponent,
    TaskBoardComponent,
  ],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css',
})
export class EmployeeDashboardComponent {}
