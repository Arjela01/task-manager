import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../../models/task.model';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { TaskService } from '../../services/task.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { ToastService } from '@task-manager/shared';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  MatButton,
  MatIconButton,
  MatMiniFabButton,
} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatTooltip } from '@angular/material/tooltip';
import { MatChip } from '@angular/material/chips';
import { CommonModule, NgClass, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatCommonModule } from '@angular/material/core';
import { MatOption, MatSelect } from '@angular/material/select';
import { UserService } from '../../services/users.service';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import {SearchService} from "../../services/search-task.service";

@Component({
  selector: 'lib-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [
    MatTable,
    MatPaginator,
    MatButton,
    MatIcon,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatTooltip,
    MatChip,
    MatFormField,
    MatInput,
    MatLabel,
    MatMiniFabButton,
    MatIconButton,
    UpperCasePipe,
    NgClass,
    FormsModule,
    TranslateModule,
    MatCommonModule,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatSelect,
    MatOption,
    MatHeaderCellDef,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatMenu,
    MatMenuTrigger,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit, AfterViewInit {
  tasks: Task[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'status',
    'assignedTo',
    'actions',
  ];
  dataSource: MatTableDataSource<Task>;
  searchQuery = '';
  userEmails: string[] = [];
  selectedEmail: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private dialog: MatDialog,
    private toastService: ToastService,
    private serviceSearch: SearchService,
  ) {
    this.dataSource = new MatTableDataSource(this.tasks);
  }

  ngOnInit(): void {
    this.loadTasksFromLocalStorage();
    this.loadUserEmails();
  }

  loadTasksFromLocalStorage(): void {
    const tasksJson = localStorage.getItem('tasks');
    if (tasksJson) {
      this.tasks = JSON.parse(tasksJson);
      this.dataSource.data = this.tasks;
    }
  }

  loadUserEmails(): void {
    this.userService.getUserEmails().subscribe((emails: string[]) => {
      this.userEmails = emails;
    });
  }

  applyFilter() {
    this.dataSource.data = this.serviceSearch.searchTasks(this.searchQuery , this.tasks);
  }

  applyEmailFilter() {
    if (this.selectedEmail) {
      this.dataSource.data = this.tasks.filter(
        (task) => task.assignedTo === this.selectedEmail
      );
    } else {
      this.dataSource.data = this.tasks;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '650px',
      data: { task: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.addTask(result);
        this.toastService.showSuccess('Task created successfully');
        this.loadTasksFromLocalStorage();
      }
    });
  }

  openEditTaskDialog(task: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '650px',
      data: { task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.updateTask(result);
        this.toastService.showSuccess('Task updated successfully');
        this.loadTasksFromLocalStorage();
      }
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
    this.toastService.showSuccess('Task deleted successfully');
    this.loadTasksFromLocalStorage();
  }
}
