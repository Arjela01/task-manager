import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatButton, MatIconButton } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskStatus, Task } from '../../models/task.model';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskService } from '../../services/task.service';
import { AuthService } from '@task-manager/auth';
import { ToastService } from '@task-manager/shared';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import { TaskCalendarComponent } from '../task-calendar/task-calendar.component';

@Component({
  selector: 'lib-task-board',
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
    TranslateModule,
  ],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
})
export class TaskBoardComponent implements OnInit {
  tasks: Task[] = [];
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];
  user = '';

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
    private toastService: ToastService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.getLoggedInUserData();
    this.loadTasks();
    this.cd.detectChanges();
  }

  openCalendarDialog(): void {
    this.tasks = this.taskService.getTasks();
    this.dialog.open(TaskCalendarComponent, {
      width: '90%',
      height: '82%',
      data: {
        tasks: this.tasks,
      },
    });
  }

  getLoggedInUserData() {
    this.user = this.authService.getUser()?.username as string;
  }

  loadTasks() {
    const tasks = this.taskService.getTasksByAssignedTo(this.user);
    this.todoTasks = tasks.filter((task) => task.status === 'todo');
    this.inProgressTasks = tasks.filter((task) => task.status === 'inProgress');
    this.doneTasks = tasks.filter((task) => task.status === 'done');
    this.cd.detectChanges();
  }

  get taskCounts() {
    return {
      todo: this.todoTasks.length,
      inProgress: this.inProgressTasks.length,
      done: this.doneTasks.length,
    };
  }

  onDrop(event: CdkDragDrop<Task[]>, status: string) {
    const task = event.item.data as Task;
    const previousList = event.previousContainer.data as Task[];
    const targetList = event.container.data as Task[];
    const index = previousList.indexOf(task);
    if (index >= 0) {
      previousList.splice(index, 1);
    }
    task.status = status as TaskStatus;
    targetList.push(task);
    this.taskService.updateTask(task);
    this.loadTasks();
  }

  openEditTaskDialog(task: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '900px',
      data: { task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.updateTask(result);
        this.translateService
          .get('task_updated_successfully')
          .subscribe((res: string) => {
            this.toastService.showSuccess(res);
          });
        this.loadTasks();
      }
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
    this.translateService
      .get('task_deleted_successfully')
      .subscribe((res: string) => {
        this.toastService.showSuccess(res);
      });
    this.loadTasks();
  }
}
