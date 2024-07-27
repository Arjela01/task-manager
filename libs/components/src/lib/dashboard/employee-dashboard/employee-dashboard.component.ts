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
import {CdkDrag, CdkDragDrop, CdkDropList} from "@angular/cdk/drag-drop";
import {HeaderComponent} from "../../header/header.component";
import {TaskService, Task, TaskDialogComponent, TaskStatus} from "@task-manager/task";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-employee-dashboard',
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
  ],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css',
})
export class EmployeeDashboardComponent implements OnInit {
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(private taskService: TaskService, private dialog: MatDialog , private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadTasks();
    this.cd.detectChanges();
  }

  loadTasks() {
    const tasks = this.taskService.getTasks();
    console.log(tasks)
    this.todoTasks = tasks.filter(task => task.status === 'todo');
    this.inProgressTasks = tasks.filter(task => task.status === 'inProgress');
    this.doneTasks = tasks.filter(task => task.status === 'done');
  }

  onDrop(event: CdkDragDrop<Task[]>) {
    const previousList = event.previousContainer.data;
    const currentList = event.container.data;
    const task = event.item.data;

    // Remove task from previous list
    previousList.splice(previousList.indexOf(task), 1);

    // Add task to current list
    currentList.push(task);

    // Optionally update task status here
    task.status = this.getStatusFromList(currentList);
    this.taskService.updateTask(task); // Update task status

    // Reload tasks to ensure the view is updated
    this.loadTasks();
  }

  getStatusFromList(list: Task[]): TaskStatus {
    if (list === this.todoTasks) return 'todo';
    if (list === this.inProgressTasks) return 'inProgress';
    if (list === this.doneTasks) return 'done';
    return 'todo';
  }

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '650px',
      data: { task: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.addTask(result);
        this.loadTasks(); // Refresh task lists
      }
    });
  }

  openEditTaskDialog(task: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '650px',
      data: { task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.updateTask(result);
        this.loadTasks(); // Refresh task lists
      }
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
    this.loadTasks(); // Refresh task lists
  }
}
