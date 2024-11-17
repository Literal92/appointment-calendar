import { Component, Renderer2, RendererFactory2 } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Appointment } from '../../models/appointment.model';
import { AppointmentsService } from '../../services/appointment.service';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { Store, select } from '@ngrx/store';
import { updateCurrentDate } from '../data/calender.actions';
import { selectCurrentDate } from '../data/calender.selector';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent {
  [x: string]: any;
  selectedDate: Date = new Date();
  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    public sharedService: SharedService,
    private appointmentsService: AppointmentsService,
    public dialog: MatDialog,
    private store: Store<{ currentDate: Date }>
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  appointmentDate: string | null = null;
  selectedAppointment: Appointment | null = null;

  onOpenDialog() {
    const dialogRef = this.dialog.open(AppointmentFormComponent, {
      data: this.selectedDate,
      width: '25%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onAddAppointment(result)
      }
    });
  }

  onAddAppointment(appointment: Appointment) {
    if (!appointment.title) {
      appointment.title = 'Unknown Title';
    }

    this.appointmentsService.addAppointment(appointment);
  }

  // ----------- DAY CHANGE -------------//
  dateChanged(event: any) {
    console.log("Date changed:", event);
    this.selectedDate = event;
    this.store.dispatch(updateCurrentDate({ currentDate: event }));
  }

  // ----------- MONTH CHANGE -------------//
  ngAfterViewInit() {
    const monthPrevBtn = document.querySelectorAll(
      '.mat-calendar-previous-button'
    );
    const monthNextBtn = document.querySelectorAll('.mat-calendar-next-button');

    if (monthPrevBtn) {
      Array.from(monthPrevBtn).forEach((button) => {
        this.renderer.listen(button, 'click', (event: any) => {
          this.sharedService.previousMonth();
        });
      });
    }

    if (monthNextBtn) {
      Array.from(monthNextBtn).forEach((button) => {
        this.renderer.listen(button, 'click', (event: any) => {
          this.sharedService.nextMonth();
        });
      });
    }
  }

  handleMonthSelected(event: any) {
    console.log("Month changed", event);
    this.selectedDate = event;
    this.store.dispatch(updateCurrentDate({ currentDate: event }));
  }

  // ---------YEAR CHANGE ----------//

  handleYearSelected(event: any) {
    console.log("Year changed", event);
    this.selectedDate = event;
    this.store.dispatch(updateCurrentDate({ currentDate: event }));
  }

}
