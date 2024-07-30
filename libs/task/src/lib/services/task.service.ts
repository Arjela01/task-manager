import { Injectable } from '@angular/core';
import { Task } from "../models/task.model";
import {TaskData} from '../mock-data/mock-data'

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private storageKey = 'tasks';
    private nextId = 1;

    constructor() {
        const storedTasks = localStorage.getItem(this.storageKey);
        if (storedTasks) {
            this.tasks = JSON.parse(storedTasks);
            this.nextId = this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
        } else {
            this.tasks = TaskData as unknown as Task[];
            this.saveTasksToLocalStorage();
        }
    }

    tasks: Task[] = [];

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
