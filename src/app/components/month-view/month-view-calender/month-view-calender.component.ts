import { Component } from '@angular/core';
import { CdkDragDrop, CdkDragStart, CdkDragEnd } from '@angular/cdk/drag-drop';
import { SharedService } from 'src/app/services/shared.service';
import { AppointmentsService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/models/appointment.model';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentFormComponent } from 'src/app/shared/appointment-form/appointment-form.component';
import { map } from 'rxjs';


@Component({
  selector: 'month-view-calender',
  templateUrl: './month-view-calender.component.html',
  styleUrls: ['./month-view-calender.component.scss']
})

export class MonthViewCalenderComponent {
  [x: string]: any;
  daysOfWeek = this.sharedService.daysOfWeek;
  appointments: Appointment[] = [];
  weeks: any[] = [];

  constructor(
    public sharedService: SharedService,
    public dialog: MatDialog,
    private appointmentsService: AppointmentsService
  ) {
    // Handle changes to the week object here
    this.sharedService.weekSubject.pipe(
      map((week: Date[]) => {
        this.weeks = week;
      }
      )).subscribe();

    appointmentsService.appointments$.pipe(
      map(res => {
        this.appointments = res;
      })
    ).subscribe();
  }

  onGetAppointment(date: string) {
    return this.appointmentsService.getAppointmentsForDate(date);
  }

  // === Appointment form condition === //
  openAppointmentForm(day: Date) {
    const dialogRef = this.dialog.open(AppointmentFormComponent, {
      data: day,
      width: '25%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onAddAppointment(result)
      }
    });
    this.selectedDate = day.getDate().toString();
  }

  selectedDate: string | null = null;
  selectedAppointment: Appointment | null = null;


  onAddAppointment(appointment: Appointment) {
    if (!appointment.title) {
      appointment.title = 'Unknown Title';
    }

    this.selectedAppointment = appointment;
    this.appointmentsService.addAppointment(appointment);
  }

  onDeleteAppointment(id: string) {
    this.appointmentsService.deleteAppointment(id);
  }

  // === Drag & Drop === //
  onDragStarted(event: CdkDragStart, appointment: Appointment) {
    this.selectedAppointment = appointment;
  }

  onDrop(event: CdkDragDrop<string[]> | any) {
    const date = event.container.data;

    if (this.selectedAppointment && date) {
      const appointmentStartTime = new Date(this.selectedAppointment.startTime);
      const appointmentEndTime = new Date(this.selectedAppointment.endTime);
      const difDays = this.getDates(appointmentStartTime, appointmentEndTime)
      const newDate = new Date(date);
      this.selectedAppointment.startTime = new Date(date);
      this.selectedAppointment.endTime = difDays ? new Date(newDate.setDate(newDate.getDate() + difDays)) : newDate;

      this.appointmentsService.updateAppointment(this.selectedAppointment)
    }
  }

  private getDates(from: Date, to: Date) {
    let daysArr = 0;
    let tempDate = from;

    while (tempDate < to) {
      tempDate.setUTCDate(tempDate.getUTCDate() + 1);
      daysArr++;
    }

    return daysArr;
  }
}
