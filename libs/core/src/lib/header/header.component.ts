import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade, AuthService } from '@task-manager/auth';
import {
  NotificationsComponent,
  NotificationService,
} from '@task-manager/shared';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { Notification } from '@task-manager/shared';
import { MatListItem } from '@angular/material/list';
import { MatTooltip } from '@angular/material/tooltip';
import { User } from '@task-manager/auth';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateComponent } from '../translate/translate.component';

@Component({
  selector: 'lib-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    MatIcon,
    NgIf,
    NgFor,
    MatListItem,
    MatTooltip,
    TranslateModule,
    TranslateComponent,
  ],
})
export class HeaderComponent implements OnInit {
  notifications: Notification[] = [];
  user!: User;
  unreadCount = 0;

  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.getNotifications();
  }

  getNotifications(){
    this.notificationService
      .startPolling(this.user?.username as string)
      .subscribe((notifications) => {
        this.notifications = notifications;
        this.unreadCount = notifications.filter(
          (notification) => !notification.read
        ).length;
      });
  }

  logout(): void {
    this.authFacade.logout();
    this.router.navigate(['/login']);
  }

  openNotifications(): void {
    const sortedNotifications = this.notifications.sort((a, b) => {
      return a.read === b.read ? 0 : a.read ? 1 : -1;
    });

    const dialogRef = this.dialog.open(NotificationsComponent, {
      data: { notifications: sortedNotifications },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getNotifications();
      this.unreadCount = this.notifications.filter(
        (notification) => !notification.read
      ).length;
    });
  }
}
