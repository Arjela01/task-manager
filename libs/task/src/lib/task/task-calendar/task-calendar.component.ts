import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {
  CalendarCommonModule,
  CalendarDayModule,
  CalendarEvent,
  CalendarMonthModule,
  CalendarView,
  CalendarWeekModule
} from 'angular-calendar';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Task } from '../../models/task.model';
import moment from "moment";

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
    CalendarWeekModule,
    CalendarDayModule,
    CalendarCommonModule,
  ],
  templateUrl: './task-calendar.component.html',
  styleUrl: './task-calendar.component.css',
})
export class TaskCalendarComponent {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  view: CalendarView = CalendarView.Month;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Task[],
    public dialogRef: MatDialogRef<TaskCalendarComponent>
  ) {
    this.initializeEvents(data);
  }

  initializeEvents(tasks: any): void {
    this.events = tasks.tasks?.map((task: Task) => ({
      start: moment(task.dueDate).toDate(),
      title: task.name,
      color: { primary: this.getEventColor(task.status) },
      allDay: true,
    })) as CalendarEvent[];
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

  protected readonly CalendarView = CalendarView;
  setView(view: CalendarView) {
    this.view = view;
  }
}
