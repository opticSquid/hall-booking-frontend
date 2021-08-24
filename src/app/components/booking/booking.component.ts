import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  imagePath: string;
  range: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  constructor() {
    this.imagePath = '/assets/booking.png';
  }

  ngOnInit(): void {}
}
