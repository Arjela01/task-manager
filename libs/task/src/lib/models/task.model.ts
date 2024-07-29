export interface Task {
    id: number;
    name: string;
    description: string;
    assignedTo: string;
    status: TaskStatus;
    comments?: Comment[];
    attachments?: Attachment[];
    mentions?: string[];
}

export type TaskStatus = 'todo' | 'inProgress' | 'done'

export interface Comment {
    id: number;
    text: string;
    author: string;
    timestamp: Date;
    mention?: string;
}

export interface Attachment {
    id: number;
    fileName: string;
    fileUrl: string;
}
