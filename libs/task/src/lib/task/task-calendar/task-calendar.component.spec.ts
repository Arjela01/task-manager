import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCalendarComponent } from './task-calendar.component';
import {TranslateModule} from "@ngx-translate/core";

describe('TaskBoardComponent', () => {
  let component: TaskCalendarComponent;
  let fixture: ComponentFixture<TaskCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
