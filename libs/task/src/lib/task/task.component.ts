import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Attachment, Task, Comment, TaskStatus} from "../models/task.model";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatList, MatListItem} from "@angular/material/list";
import {MatLine, MatOption} from "@angular/material/core";
import {DatePipe, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatSelect} from "@angular/material/select";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
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
  ]
})
export class TaskDialogComponent implements OnInit {
  form!: FormGroup;
  isEditMode: boolean;
  comments: Comment[] = [];
  attachments: Attachment[] = [];
  statuses: TaskStatus[] = ['todo', 'inProgress', 'done'];
  nextCommentId = 1;
  nextAttachmentId = 1;

  constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<TaskDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { task?: Task }
  ) {
    this.isEditMode = !!data.task;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.data.task?.id || null],
      name: [this.data.task?.name || '', Validators.required],
      description: [this.data.task?.description || '', Validators.required],
      status: [this.data.task?.status || 'todo', Validators.required],
    });

    this.comments = this.data.task?.comments || [];
    this.attachments = this.data.task?.attachments || [];
  }

  addComment(commentText: string) {
    if (commentText.trim()) {
      this.comments.push({
        id: this.nextCommentId++,
        author: 'Current User',
        text: commentText,
        timestamp: new Date()
      });
    }
  }

  addAttachment(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input?.files[0];
      const attachment = {
        id: this.nextAttachmentId++,
        fileName: file.name,
        fileUrl: URL.createObjectURL(file)
      };
      this.attachments.push(attachment);
      input.value = '';
    }
  }

  removeAttachment(attachment: Attachment) {
    const index = this.attachments.findIndex(att => att.id === attachment.id);
    if (index > -1) {
      this.attachments.splice(index, 1);
    }
  }

  save() {
    if (this.form.valid) {
      const task: Task = {
        ...this.form.value,
        comments: this.comments,
        attachments: this.attachments
      };
      this.dialogRef.close(task);
    }
  }
}
