import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthViewCalenderComponent } from './month-view-calender.component';

describe('MonthViewCalenderComponent', () => {
  let component: MonthViewCalenderComponent;
  let fixture: ComponentFixture<MonthViewCalenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthViewCalenderComponent]
    });
    fixture = TestBed.createComponent(MonthViewCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
