import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppointmentsService {

  private appointments: Appointment[] = [];
  appointments$: BehaviorSubject<Appointment[]> = new BehaviorSubject<Appointment[]>([]);

  constructor() {
    this.loadAppointmentsFromLocalStorage();
  }

  private loadAppointmentsFromLocalStorage() {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      this.appointments = JSON.parse(storedAppointments);
      this.appointments$.next(this.appointments);
    }
  }

  private saveAppointmentsToLocalStorage() {
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
    this.appointments$.next(this.appointments);
  }

  addAppointment(appointment: Appointment) {
    appointment.id = Date.now().toString();
    this.appointments.push(appointment);
    this.saveAppointmentsToLocalStorage();
  }

  getAppointmentsForDate(date: string): Appointment[] {
    return this.appointments.filter(appointment => {
      const appointmentStartTime = new Date(appointment.startTime);
      const appointmentEndTime = new Date(appointment.endTime);
      const selectedDate = new Date(date);

      appointmentStartTime.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);
      appointmentEndTime.setHours(0, 0, 0, 0);
      
      return appointmentStartTime <= selectedDate && selectedDate <= appointmentEndTime;
    });
  }

  updateAppointment(updatedAppointment: Appointment) {
    const index = this.appointments.findIndex(appointment => appointment.id === updatedAppointment.id);
    if (index !== -1) {
      this.appointments[index] = updatedAppointment;
      this.saveAppointmentsToLocalStorage();
    }
  }

  deleteAppointment(appointmentId: string) {
    this.appointments = this.appointments.filter(appointment => appointment.id !== appointmentId);
    this.saveAppointmentsToLocalStorage();
  }
}
