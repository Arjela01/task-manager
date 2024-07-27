import { Injectable } from '@angular/core';
import { Task} from "../models/task.model";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private storageKey = 'tasks';
    private nextId = 1;

    constructor() {
        // Load tasks from local storage or initialize with predefined tasks
        const storedTasks = localStorage.getItem(this.storageKey);
        if (storedTasks) {
            this.tasks = JSON.parse(storedTasks);
            this.nextId = this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
        } else {
            // Initialize with predefined tasks
            this.tasks = [
                {
                    id: this.nextId++,
                    name: 'Task 1',
                    description: 'Description 1',
                    status: 'todo',
                    comments: [
                        { id: 1, text: 'Initial comment on Task 1', author: 'Alice', timestamp: new Date('2023-07-24T10:00:00') },
                        { id: 2, text: 'Another comment on Task 1', author: 'Bob', timestamp: new Date('2023-07-24T12:00:00') }
                    ],
                    attachments: [
                        { id: 1, fileName: 'task1_doc1.pdf', fileUrl: 'https://example.com/task1_doc1.pdf' },
                        { id: 2, fileName: 'task1_doc2.png', fileUrl: 'https://example.com/task1_doc2.png' }
                    ]
                },
                {
                    id: this.nextId++,
                    name: 'Task 2',
                    description: 'Description 2',
                    status: 'inProgress',
                    comments: [
                        { id: 1, text: 'Initial comment on Task 2', author: 'Charlie', timestamp: new Date('2023-07-25T09:00:00') }
                    ],
                    attachments: [
                        { id: 1, fileName: 'task2_image1.jpg', fileUrl: 'https://example.com/task2_image1.jpg' }
                    ]
                },
                {
                    id: this.nextId++,
                    name: 'Task 3',
                    description: 'Description 3',
                    status: 'done',
                    comments: [
                        { id: 1, text: 'Initial comment on Task 3', author: 'Dave', timestamp: new Date('2023-07-26T11:00:00') }
                    ],
                    attachments: [
                        { id: 1, fileName: 'task3_report.pdf', fileUrl: 'https://example.com/task3_report.pdf' }
                    ]
                }
            ];
            this.saveTasksToLocalStorage();
        }
    }

    private tasks: Task[] = [];

    getTasks(): Task[] {
        return this.tasks;
    }

    addTask(task: Task): void {
        if (task.id == null) {
            task.id = this.nextId++;
        }
        this.tasks.push(task);
        this.saveTasksToLocalStorage();
    }

    updateTask(updatedTask: Task): void {
        const index = this.tasks.findIndex(task => task.id === updatedTask.id);
        if (index > -1) {
            this.tasks[index] = updatedTask;
            this.saveTasksToLocalStorage();
        }
    }

    deleteTask(id: number): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasksToLocalStorage();
    }

    private saveTasksToLocalStorage(): void {
        localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    }
}
