export interface Task {
    id: number;
    name: string;
    description: string;
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
}

export interface Attachment {
    id: number;
    fileName: string;
    fileUrl: string;
}
