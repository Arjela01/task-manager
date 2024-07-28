import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
import {MatDialog} from "@angular/material/dialog";
import {TaskStatus , Task} from "../../models/task.model";
import {TaskDialogComponent} from "../task-dialog/task-dialog.component";
import {TaskService} from "../../services/task.service";
import {AuthService} from "@task-manager/login";
import {ToastService} from "../../services/global.service";

@Component({
  selector: 'app-task-board',
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
    MatCardActions,
  ],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.css',
})
export class TaskBoardComponent implements OnInit {
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];
  user = '' ;

  constructor(private taskService: TaskService, private dialog: MatDialog , private cd: ChangeDetectorRef , private authService: AuthService , private toastService: ToastService) {}

  ngOnInit(): void {
    this.getLoggedInUserData();
    this.loadTasks();
    this.cd.detectChanges();
  }

  getLoggedInUserData(){
    this.user = this.authService.getUser().username as string;
  }

  loadTasks() {
    const tasks = this.taskService.getTasksByAssignedTo(this.user);
    this.todoTasks = tasks.filter(task => task.status === 'todo');
    this.inProgressTasks = tasks.filter(task => task.status === 'inProgress');
    this.doneTasks = tasks.filter(task => task.status === 'done');
    this.cd.detectChanges();
  }

  onDrop(event: CdkDragDrop<Task[]>) {
    const previousList = event.previousContainer.data;
    const currentList = event.container.data;
    const task = event.item.data;
    previousList.splice(previousList.indexOf(task), 1);
    currentList.push(task);
    task.status = this.getStatusFromList(currentList);
    this.taskService.updateTask(task)
    this.loadTasks();
  }

  getStatusFromList(list: Task[]): TaskStatus {
    if (list === this.todoTasks) return 'todo';
    if (list === this.inProgressTasks) return 'inProgress';
    if (list === this.doneTasks) return 'done';
    return 'todo';
  }

  openEditTaskDialog(task: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '650px',
      data: { task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.updateTask(result);
        this.toastService.showSuccess('Task updated successfully')
        this.loadTasks(); // Refresh task lists
      }
    });
  }

  deleteTask(task: Task) {
    this.toastService.showSuccess('Task deleted successfully')
    this.taskService.deleteTask(task.id);
    this.loadTasks(); // Refresh task lists
  }
}
