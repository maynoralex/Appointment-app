import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment'
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-appointment-list',
  standalone: false,
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit {

  newAppointmentTitle: string = "";
  newAppointmentDate: Date = new Date();

  appointments: Appointment[] = [];

  ngOnInit(): void {
    const savedAppointments = localStorage.getItem("appointments");
    if(savedAppointments) {
      this.appointments = JSON.parse(savedAppointments);  
    }
  }

  addAppointment() {
    if(this.newAppointmentTitle.trim().length > 0  && this.isValidDate(this.newAppointmentDate as Date)){
      const newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle, 
        date:  this.newAppointmentDate
      };
      this.appointments.push(newAppointment);
      this.newAppointmentTitle = "";
      this.newAppointmentDate = new Date();
    }

    localStorage.setItem('appointments', JSON.stringify(this.appointments));

  }

  deleteAppointment(index : number){
    this.appointments.splice(index, 1);
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }

  private isValidDate(date: Date | string): boolean {
    if (typeof date === 'string'){
      const newDate = new Date(date);
      return !isNaN(newDate.getTime());
    }
    return !isNaN(date.getTime());
  }

}
