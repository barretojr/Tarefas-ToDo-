import { Injectable, signal } from '@angular/core';
import { Notification, NotificationType } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private nextId = 1;
  public notifications = signal<Notification[]>([]);

  addNotification(message: string, type: NotificationType) {
    const newNotification: Notification = {
      id: this.nextId++,
      message,
      type
    };
    this.notifications.update(n => [...n, newNotification]);

    setTimeout(() => this.dismissNotification(newNotification.id), 5000);
  }

  dismissNotification(id: number) {
    this.notifications.update(n => n.filter(notif => notif.id !== id));
  }
}