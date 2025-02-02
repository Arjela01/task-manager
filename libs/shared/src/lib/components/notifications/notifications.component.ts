import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {TranslateModule} from "@ngx-translate/core";
import {Notification} from "../../models/notification.model";

@Component({
  selector: 'lib-notifications',
  standalone: true,
  templateUrl: './notifications.component.html',
  imports: [
    DatePipe,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    CommonModule,
    TranslateModule,
  ],
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent {
  notifications: Notification[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { notifications: Notification[] }
  ) {
    this.notifications = data.notifications || [];
  }

  markAsRead(notification: Notification): void {
    notification.read = true;
    this.saveNotifications();
  }

  clearNotifications(): void {
    this.notifications = [];
    this.saveNotifications();
  }

  saveNotifications(): void {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    localStorage.setItem(
      `notifications_${currentUser.username}`,
      JSON.stringify(this.notifications)
    );
  }
}
