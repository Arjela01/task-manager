import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  name: string;
  description: string;
  status: 'new' | 'in progress' | 'done';
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      name: 'Task 1',
      description: 'Description for Task 1',
      status: 'new',
    },
    {
      id: 2,
      name: 'Task 2',
      description: 'Description for Task 2',
      status: 'in progress',
    },
    {
      id: 3,
      name: 'Task 3',
      description: 'Description for Task 3',
      status: 'done',
    },
  ];

  getTasks(): Task[] {
    return this.tasks;
  }
}
