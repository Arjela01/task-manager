export interface Notification {
    message: string;
    timestamp: Date;
    read?: boolean;
    author?: string;
}