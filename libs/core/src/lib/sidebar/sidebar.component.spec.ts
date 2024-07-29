import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthFacade, AuthService } from '@task-manager/auth';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule} from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

class MockActivatedRoute {
  // Mock any properties or methods that are used in the component
  params = of({}); // Example: replace with your actual mock data if needed
  snapshot = { params: {} };
}

describe('ComponentsComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let store: MockStore;
  let authFacade: AuthFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        NoopAnimationsModule,
      ],
      providers: [
        provideMockStore({
          selectors: [],
        }),
        { provide: AuthFacade },
        { provide: AuthService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    authFacade = TestBed.inject(AuthFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
