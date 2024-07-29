import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Attachment, Task, Comment, TaskStatus } from '../../models/task.model';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatList, MatListItem } from '@angular/material/list';
import { MatLine, MatOption } from '@angular/material/core';
import {
  AsyncPipe,
  DatePipe,
  NgForOf,
  NgIf,
  TitleCasePipe,
} from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSelect } from '@angular/material/select';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { Observable } from 'rxjs';
import { UserService } from '../../services/users.service';
import { NotificationService } from '@task-manager/shared';
import { AuthService } from '@task-manager/auth';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'lib-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatList,
    MatListItem,
    MatLine,
    DatePipe,
    MatInput,
    MatButton,
    NgForOf,
    MatDialogActions,
    MatLabel,
    MatIconButton,
    MatIcon,
    TitleCasePipe,
    MatOption,
    MatSelect,
    NgIf,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatError,
    AsyncPipe,
    MatTab,
    MatTabGroup,
    TranslateModule,
  ],
})
export class TaskDialogComponent implements OnInit {
  form!: FormGroup;
  isEditMode: boolean;
  comments: Comment[] = [];
  attachments: Attachment[] = [];
  statuses: TaskStatus[] = ['todo', 'inProgress', 'done'];
  nextCommentId = 1;
  nextAttachmentId = 1;
  userEmails$: Observable<string[]>;
  currentUserEmail!: string;
  originalAssignedTo?: string;
  mentionUser = '';
  teamMembers = [''];
  filteredTeamMembers: string[] = [];
  showMentionsDropdown = false;
  teamMemberSelected = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task?: Task },
    private userService: UserService,
    private notificationsService: NotificationService,
    private authService: AuthService
  ) {
    this.isEditMode = !!data.task;
    this.userEmails$ = this.userService.getUserEmails();
    this.originalAssignedTo = data.task?.assignedTo;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.data.task?.id || null],
      name: [this.data.task?.name || '', Validators.required],
      description: [this.data.task?.description || '', Validators.required],
      status: [this.data.task?.status || 'todo', Validators.required],
      assignedTo: [this.data.task?.assignedTo || '', Validators.required],
    });

    this.comments = this.data.task?.comments || [];
    this.attachments = this.data.task?.attachments || [];

    this.currentUserEmail = this.authService.getUser().username as string;
    this.userService.getUserEmails().subscribe((emails) => {
      this.teamMembers = emails.map((email) => email.split('@')[0]);
    });
  }

  onCommentInput(value: string) {
    const mentionIndex = value.lastIndexOf('@');
    if (mentionIndex !== -1) {
      const searchTerm = value.slice(mentionIndex + 1).trim();
      if (searchTerm && !this.teamMemberSelected) {
        this.filteredTeamMembers = this.teamMembers.filter((member) =>
          member.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.showMentionsDropdown = true;
      } else {
        this.showMentionsDropdown = false;
      }
    } else {
      this.showMentionsDropdown = false;
    }
  }

  selectTeamMember(member: string) {
    const textarea: HTMLTextAreaElement | null = document.querySelector(
      '#commentText'
    ) as HTMLTextAreaElement;
    if (textarea) {
      const value = textarea.value;
      const mentionIndex = value.lastIndexOf('@');
      textarea.value = value.slice(0, mentionIndex + 1) + member + ' ';
      this.showMentionsDropdown = false;
      this.teamMemberSelected = true;
    }
  }

  addComment(commentText: string) {
    if (commentText.trim()) {
      const mentionUsername = this.extractMentionUsername(commentText);
      this.mentionUser = mentionUsername
        ? `${mentionUsername}@example.com`
        : '';

      this.comments.push(<Comment>{
        id: this.nextCommentId++,
        author: this.currentUserEmail,
        text: commentText,
        timestamp: new Date(),
        mention: mentionUsername,
      });

      if (this.mentionUser) {
        const notificationMessage = commentText
          .replace(`@${mentionUsername}`, '')
          .trim();
        this.notificationsService.addNotification(this.mentionUser, {
          message: `You were mentioned in a comment: "${notificationMessage}"`,
          timestamp: new Date(),
          read: false,
          author: this.currentUserEmail,
        });
      }
    }
  }

  private extractMentionUsername(commentText: string): string | null {
    const mentionPattern = /@(\w+)/;
    const match = commentText.match(mentionPattern);
    return match ? match[1] : null;
  }

  addAttachment(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input?.files[0];
      const attachment = {
        id: this.nextAttachmentId++,
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
      };
      this.attachments.push(attachment);
      input.value = '';
    }
  }

  removeAttachment(attachment: Attachment) {
    const index = this.attachments.findIndex((att) => att.id === attachment.id);
    if (index > -1) {
      this.attachments.splice(index, 1);
    }
  }

  save() {
    if (this.form.valid) {
      const task: Task = {
        ...this.form.value,
        comments: this.comments,
        attachments: this.attachments,
      };

      if (this.originalAssignedTo !== task.assignedTo) {
        this.notificationsService.addNotification(task.assignedTo, {
          message: `Task "${task.name}" has been assigned to you.`,
          timestamp: new Date(),
          read: false,
          author: this.currentUserEmail,
        });
      }

      this.dialogRef.close(task);
    }
  }
}
