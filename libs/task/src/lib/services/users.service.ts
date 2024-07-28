import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {MockUsers} from "../mock-data/mock-data";

@Injectable({
    providedIn: 'root',
})
export class UserService {

    getUserEmails(): Observable<string[]> {
        const emails = MockUsers.map(user => user.username);
        return of(emails);
    }
}
