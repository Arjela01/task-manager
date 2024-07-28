import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MockUsers } from '@task-manager/shared';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    getUserEmails(): Observable<string[]> {
        const emails = MockUsers.map(user => user.username);
        return of(emails);
    }
}
