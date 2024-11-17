import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { selectCurrentDate } from '../shared/data/calender.selector';


@Injectable({
  providedIn: 'root'
})


export class SharedService {

  private currentDate$: Observable<Date>;
  currentDate: Date | undefined;
  currentMonth = new Date();
  currentView = 'month'
  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(
    private store: Store
  ) {
    this.currentDate$ = this.store.pipe(select(selectCurrentDate));
    this.currentDate$.subscribe(date => this.currentDate = date);
    this.generateCalendar();
  }

  // ------- Switch To Week View ------- //
  switchToWeekView() {
    this.currentView = 'week';
  }

  // ------- Switch To Month View ------- //
  switchToMonthView() {
    this.currentView = 'month';
  }

  // ------- Switch To Day View ------- //
  switchToDayView() {
    this.currentView = 'day';
  }

  // ------- Switch To Year View ------- //
  switchToYearView() {
    this.currentView = 'year';
  }

  generateCalendar() {
    if (this.currentView === 'month') {
      const startDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
      const endDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
      const month = this.currentMonth.getMonth() + 1;
      const year = this.currentMonth.getFullYear();
      const numDays = endDate.getDate();
      const startDay = startDate.getDay();

      const weeks: any[] = [];
      let currentWeek: any[] = [];

      for (let i = 0; i < startDay; i++) {
        currentWeek.push({ day: '' });
      }
      
      for (let day = 1; day <= numDays; day++) {
        currentWeek.push({ day, date: new Date(`${year}-${month}-${day}`) });
        if (currentWeek.length === 7) {
          weeks.push(currentWeek);
          currentWeek = [];
        }
      }
      
      if (currentWeek.length > 0) {
        weeks.push(currentWeek);
      }

      this.weekSubject.next(weeks);
    } else if (this.currentView === 'week') {
      const startDate = new Date(this.currentMonth);
      startDate.setDate(startDate.getDate() - startDate.getDay()); // Start from the first day of the week

      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6); // End on the last day of the week

      const calendar: any[] = [];
      let currentWeek: any[] = [];

      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        currentWeek.push({
          day: currentDate.getDate(),
          date: new Date(currentDate),
          events: [] // You can populate this with events for the day
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }

      calendar.push(currentWeek);

      this.weekSubject.next(calendar);

    } else if (this.currentView === 'day') {

      const currentDate = new Date();
      this.weekSubject.next([[{ day: currentDate.getDate(), events: [] }]]);

    }

  }
  previousMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.generateCalendar();
  }

  currentYear: any = '';
  previousYear() {
    this.currentYear = new Date(this.currentMonth.getFullYear() + 1);

  }

  nextYear() {
    this.currentYear = new Date(this.currentMonth.getFullYear() + 1);

  }


}
