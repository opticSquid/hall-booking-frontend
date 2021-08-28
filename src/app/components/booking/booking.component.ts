import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GetHalls } from 'src/app/getHalls';
import { DbService } from '../../services/db.service';
import { HallOutput } from 'src/app/getHalls';
import { Router } from '@angular/router';
import { Booking } from 'src/app/Booking';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  imagePath: string;
  Halls: HallOutput[] = [];
  userSearch: boolean = true;
  userBooking: boolean = false;
  Bookings: any = [];
  range: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  token: string | null = localStorage.getItem('Token');
  constructor(private db: DbService, private router: Router) {
    this.imagePath = '/assets/booking.png';
  }

  ngOnInit(): void {
    this.db.getHalls().subscribe(
      (data: GetHalls) => {
        this.Halls = data.halls;
        console.log('All Halls Data: ', this.Halls);
      },
      (err) => {
        console.log('Error: ', err);
      },
      () => {
        console.log('Fetching halls completed');
      }
    );
    this.db.getBookingByUser(this.token).subscribe(
      (data: any) => {
        let response = data.response;
        this.Bookings = response;

        console.log('All Halls Data: ', this.Bookings);
      },
      (err) => {
        console.log('error: ', err);
      },
      () => {
        let booking;
        for (booking of this.Bookings) {
          booking.start_date = booking.start_date.split('T')[0];
          booking.end_date = booking.end_date.split('T')[0];
        }

        console.log('completed');
        console.log('Booking data: ', this.Bookings);
      }
    );
  }
  search_date(): void {
    this.userBooking = false;
    this.userSearch = true;
    console.log('search_date: ', this.range.value.start, this.range.value.end);
    this.db
      .sendSearchData({
        start_date: this.range.value.start,
        end_date: this.range.value.end,
      })
      .subscribe(
        (data) => {
          console.log('data incoming: ', data);
          console.log('lngth of data: ', data.data.length);
          if (data.data.length > 0) {
            this.Halls = data.data;
          }
        },
        (err) => {
          console.log('error: ', err);
        },
        () => {
          console.log('completed');
        }
      );
  }
  book(hall: any): void {
    hall.token = localStorage.getItem('Token');
    if (!this.range.value.start || !this.range.value.end) {
      alert('Enter starting and ending dates');
    } else {
      hall.start_date = this.range.value.start;
      hall.end_date = this.range.value.end;
      this.db.createBooking(hall).subscribe(
        (data) => {
          console.log('data: ', data);
          alert(`${hall.Name} has been booked for you`);
          this.router.navigate(['']);
        },
        (err) => {
          console.log('error: ', err);
        },
        () => {
          console.log('completed');
        }
      );
    }
  }
  your_bookings(): void {
    this.userSearch = false;
    this.userBooking = true;
  }
  delete_book(booking: any): void {
    booking.token = localStorage.getItem('Token');
    console.log('Booking', booking);
    this.db.deleteBooking(booking).subscribe(
      (data) => {
        console.log('data: ', data);
        alert(`${booking.Name} has been deleted`);
        this.router.navigate(['']);
      },
      (err) => {
        console.log('error: ', err);
      },
      () => {
        console.log('completed');
      }
    );
  }
}
