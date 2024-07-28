import { Injectable } from '@angular/core';
import { Task } from "../models/task.model";
import { TaskData } from "@task-manager/shared";

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
            this.tasks = TaskData;
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

    getTasksByAssignedTo(email: string): Task[] {
        if (email === 'employee@example.com') {
            return this.tasks.filter(task => task.assignedTo === email);
        } else {
            return this.tasks.filter(task => task.assignedTo !== 'employee@example.com');
        }
    }

    private saveTasksToLocalStorage(): void {
        localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    }
}
