import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { BaseChartDirective } from "ng2-charts";
import { Chart, registerables } from "chart.js";

// Register the required chart types
Chart.register(...registerables);

@Component({
    selector: 'app-statistics',
    standalone: true,
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css'],
    imports: [
        MatCard,
        MatCardHeader,
        MatCardContent,
        BaseChartDirective,
        MatCardTitle,
    ]
})
export class StatisticsComponent implements OnInit {
    tasks: any[] = [];
    taskStatusData: any[] = [];
    taskStatusLabels: string[] = [];
    teamPerformanceData: any[] = [];
    teamPerformanceLabels: string[] = [];

    ngOnInit(): void {
        this.loadTasksFromLocalStorage();
        this.generateTaskStatusData();
        this.generateTeamPerformanceData();
    }

    public taskStatusOptions = {
        responsive: true,
        aspectRatio: 2,
        plugins: {
            title: {
                display: true,
                text: 'Task Status Distribution',
                font: {
                    size: 20
                }
            }
        }
    };

    public teamPerformanceOptions = {
        responsive: true,
        aspectRatio: 2,
        plugins: {
            title: {
                display: true,
                text: 'Team Performance',
                font: {
                    size: 20
                }
            }
        }
    };

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
            { data: Object.values(statusCounts), label: 'Task Status' }
        ];
        this.taskStatusLabels = Object.keys(statusCounts);
    }

    private generateTeamPerformanceData(): void {
        const teamData = this.tasks.reduce((acc, task) => {
            acc[task.assignedTo] = (acc[task.assignedTo] || 0) + 1;
            return acc;
        }, {});

        this.teamPerformanceData = [
            { data: Object.values(teamData), label: 'Tasks Per Member' }
        ];
        this.teamPerformanceLabels = Object.keys(teamData);
    }
}
