import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private storageKey = 'notifications';

  addNotification(
    username: string,
    notification: { message: string; timestamp: Date; read: boolean  , author: string}
  ) {
    const notifications = this.getNotificationsFromLocalStorage(username);
    notifications.push(notification);
    localStorage.setItem(
      `${this.storageKey}_${username}`,
      JSON.stringify(notifications)
    );
  }

  getNotifications(
    username: string
  ): Observable<{ message: string; timestamp: Date; read: boolean  , author: string}[]> {
    const notifications = this.getNotificationsFromLocalStorage(username);
    return of(notifications);
  }

  private getNotificationsFromLocalStorage(
    username: string
  ): { message: string; timestamp: Date; read: boolean , author: string }[] {
    const notificationsJson = localStorage.getItem(
      `${this.storageKey}_${username}`
    );
    return notificationsJson ? JSON.parse(notificationsJson) : [];
  }
}
export interface Notification {
  message: string;
  timestamp: Date;
  read?: boolean;
  author?: string;
}
