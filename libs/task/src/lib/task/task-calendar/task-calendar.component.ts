import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarEvent, CalendarMonthModule } from 'angular-calendar';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Task } from '../../models/task.model';

@Component({
  selector: 'lib-task-board',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CalendarMonthModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
  ],
  templateUrl: './task-calendar.component.html',
  styleUrl: './task-calendar.component.css',
})
export class TaskCalendarComponent {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Task[],
    public dialogRef: MatDialogRef<TaskCalendarComponent>
  ) {
    this.initializeEvents(data);
  }

  initializeEvents(tasks: any): void {
    this.events = tasks.tasks.map((task: Task) => {
      const [day, month, year] = (task.dueDate as string)
        .split('/')
        .map(Number);
      const date = new Date(year, month - 1, day);

      return {
        start: date,
        title: task.name,
        color: { primary: this.getEventColor(task.status) },
      } as CalendarEvent;
    });
  }

  getEventColor(status: string): string {
    switch (status) {
      case 'todo':
        return 'blue';
      case 'inProgress':
        return 'orange';
      case 'done':
        return 'green';
      default:
        return 'gray';
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
