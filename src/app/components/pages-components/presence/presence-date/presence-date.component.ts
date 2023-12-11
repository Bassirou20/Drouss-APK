import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presence-date',
  templateUrl: './presence-date.component.html',
  styleUrls: ['./presence-date.component.scss']
})
export class PresenceDateComponent {
  constructor(private router: Router) {
    const today = new Date();
    this.selectedDate = today.toISOString().slice(0, 10);
  }
 MyDate:Date=new Date();

  selectedDate: string;

  onSubmit(date: string) {
    const selectedDate = new Date(date);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    this.selectedDate = `${year}-${month}-${day}`;
    console.log('date', this.selectedDate);
  }

}
