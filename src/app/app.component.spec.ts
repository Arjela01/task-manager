import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
// eslint-disable-next-line @nx/enforce-module-boundaries
import {AuthFacade, AuthService} from "@task-manager/auth";

describe('AppComponent', () => {
  let store: MockStore;
  let authFacade: AuthFacade;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
      ],
      providers: [
        provideMockStore({
          selectors: [],
        }),
        { provide: AuthFacade },
        { provide: AuthService },
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    authFacade = TestBed.inject(AuthFacade);
  });

  it(`should have as title 'task-manager'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('task-manager');
  });
});
