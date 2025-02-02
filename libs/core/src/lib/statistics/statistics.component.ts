import { Component, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

Chart.register(...registerables);

@Component({
  selector: 'lib-statistics',
  standalone: true,
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    BaseChartDirective,
    MatCardTitle,
    TranslateModule,
  ],
})
export class StatisticsComponent implements OnInit {
  tasks: any[] = [];
  taskStatusData: any[] = [];
  taskStatusLabels: string[] = [];
  teamPerformanceData: any[] = [];
  teamPerformanceLabels: string[] = [];
  taskStatusOptions: any;
  teamPerformanceOptions: any;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadTasksFromLocalStorage();
    this.generateTaskStatusData();
    this.generateTeamPerformanceData();
    this.setChartOptions();
  }

  private setChartOptions(): void {
    this.translate.get('task_status_distribution').subscribe((res: string) => {
      this.taskStatusOptions = {
        responsive: true,
        aspectRatio: 2,
        plugins: {
          title: {
            display: true,
            text: res,
            font: {
              size: 20,
            },
          },
        },
      };
    });

    this.translate.get('team_performance').subscribe((res: string) => {
      this.teamPerformanceOptions = {
        responsive: true,
        aspectRatio: 2,
        plugins: {
          title: {
            display: true,
            text: res,
            font: {
              size: 20,
            },
          },
        },
      };
    });
  }

  private loadTasksFromLocalStorage(): void {
    const tasksFromStorage = localStorage.getItem('tasks');
    if (tasksFromStorage) {
      this.tasks = JSON.parse(tasksFromStorage);
    } else {
      this.tasks = [];
    }
  }

  private generateTaskStatusData(): void {
    const statusCounts = this.tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});

    this.taskStatusData = [
      { data: Object.values(statusCounts), label: 'Task Status' },
    ];
    this.taskStatusLabels = Object.keys(statusCounts);
  }

  private generateTeamPerformanceData(): void {
    const teamData = this.tasks.reduce((acc, task) => {
      acc[task.assignedTo] = (acc[task.assignedTo] || 0) + 1;
      return acc;
    }, {});

    this.teamPerformanceData = [
      { data: Object.values(teamData), label: 'Tasks Per Member' },
    ];
    this.teamPerformanceLabels = Object.keys(teamData);
  }
}
