import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    constructor(private snackBar: MatSnackBar) {}

    private getSnackBarConfig(panelClass: string[]): MatSnackBarConfig {
        return {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: [...panelClass, 'upper-left-snackbar']
        };
    }

    showSuccess(message: string, duration = 3000): void {
        this.snackBar.open(message, 'Close', {
            ...this.getSnackBarConfig(['success-snackbar']),
            duration
        });
    }

    showError(message: string, duration = 3000): void {
        this.snackBar.open(message, 'Close', {
            ...this.getSnackBarConfig(['error-snackbar']),
            duration
        });
    }

    showInfo(message: string, duration = 3000): void {
        this.snackBar.open(message, 'Close', {
            ...this.getSnackBarConfig(['info-snackbar']),
            duration
        });
    }

    showWarning(message: string, duration = 3000): void {
        this.snackBar.open(message, 'Close', {
            ...this.getSnackBarConfig(['warning-snackbar']),
            duration
        });
    }
}
