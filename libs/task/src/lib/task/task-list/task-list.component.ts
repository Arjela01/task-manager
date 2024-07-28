
import { Component, OnInit } from '@angular/core';
import {MatDialog,
} from '@angular/material/dialog';
import { Task } from "../../models/task.model";
import {MatList, MatListItem} from "@angular/material/list";
import {MatLine} from "@angular/material/core";
import {DatePipe, NgClass, UpperCasePipe} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {TaskService} from "../../services/task.service";
import {TaskDialogComponent} from "../task-dialog/task-dialog.component";
import {MatTooltip} from "@angular/material/tooltip";
import {MatChip} from "@angular/material/chips";
import {ToastService} from "@task-manager/shared";

@Component({
  selector: 'lib-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [
    MatList,
    MatListItem,
    MatLine,
    DatePipe,
    MatInput,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatButton,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatIcon,
    MatCardContent,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatIconButton,
    MatMiniFabButton,
    MatTooltip,
    NgClass,
    UpperCasePipe,
    MatChip
  ]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'status', 'actions'];
  constructor(private taskService: TaskService ,  private dialog: MatDialog , private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.loadTasksFromLocalStorage();
  }

  loadTasksFromLocalStorage(): void {
    const tasksJson = localStorage.getItem('tasks');
    if (tasksJson) {
      this.tasks = JSON.parse(tasksJson);
    }
  }

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '650px',
      data: { task: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.addTask(result);
        this.toastService.showSuccess('Task created successfully')
        this.loadTasksFromLocalStorage(); // Refresh task lists
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
        this.toastService.showSuccess('Task updated successfully')
        this.loadTasksFromLocalStorage();
      }
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
    this.toastService.showSuccess('Task deleted successfully')
    this.loadTasksFromLocalStorage();
  }
}
