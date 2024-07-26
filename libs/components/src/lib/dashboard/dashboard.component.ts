import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import {MatButton, MatIconButton} from '@angular/material/button';
import { TaskService } from './dashboard.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import {CdkDrag, CdkDragDrop, CdkDropList} from "@angular/cdk/drag-drop";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-dashboard',
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
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  todoTasks = [
    { name: 'Task 1', description: 'Description 1', status: 'todo' },
    // other tasks
  ];
  inProgressTasks = [
    { name: 'Task 2', description: 'Description 2', status: 'inProgress' },
    // other tasks
  ];
  doneTasks = [
    { name: 'Task 3', description: 'Description 3', status: 'done' },
    // other tasks
  ];

  constructor(private taskService: TaskService) {}

  onDrop(event: CdkDragDrop<any[]>) {
    const previousList = event.previousContainer.data;
    const currentList = event.container.data;
    const task = event.item.data;

    // Remove task from previous list
    previousList.splice(previousList.indexOf(task), 1);

    // Add task to current list
    currentList.push(task);

    // Optionally update task status here
    task.status = this.getStatusFromList(currentList);
  }

  getStatusFromList(list: any[]) {
    if (list === this.todoTasks) return 'todo';
    if (list === this.inProgressTasks) return 'inProgress';
    if (list === this.doneTasks) return 'done';
    return '';
  }
  openAddTaskDialog() {
    // const dialogRef = this.dialog.open(AddTaskDialogComponent, {
    //   width: '400px'
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     // Add the new task to the To Do list
    //     this.todoTasks.push(result);
    //   }
    // });
  }
}
