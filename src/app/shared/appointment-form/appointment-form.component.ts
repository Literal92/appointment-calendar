import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDatepickerModule
  ]
})

export class AppointmentFormComponent {

  appointmentForm = new FormGroup({
    title: new FormControl(''),
    startTime: new FormControl(new Date(), [Validators.required]),
    endTime: new FormControl(new Date(), [Validators.required]),
    date: new FormControl(new Date(), [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<AppointmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Date,
  ) { 
    if (data) {
      this.appointmentForm.controls['startTime'].setValue(data);
      this.appointmentForm.controls['endTime'].setValue(data);
    }
  }

  onSubmit() {
    this.dialogRef.close(this.appointmentForm.value)
    this.appointmentForm.reset();
  }

  onClose() {
    this.dialogRef.close();
  }
}
