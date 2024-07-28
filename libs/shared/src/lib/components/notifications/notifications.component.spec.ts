import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NofificationsComponent } from './nofifications.component';

describe('NotFound', () => {
  let component: NofificationsComponent;
  let fixture: ComponentFixture<NofificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NofificationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NofificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
