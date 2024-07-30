import { ComponentFixture, TestBed } from '@angular/core/testing';
import {NotificationsComponent} from "@task-manager/shared";
import {TranslateModule} from "@ngx-translate/core";
import {provideMockStore} from "@ngrx/store/testing";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {of} from "rxjs";

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideMockStore({
          selectors: [],
        }),
        { provide: MatDialogRef, useValue: { afterClosed: () => of(true) } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
