import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GetHalls } from 'src/app/getHalls';
import { DbService } from '../../services/db.service';
import { HallOutput } from 'src/app/getHalls';
import { Router } from '@angular/router';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  imagePath: string;
  Halls: HallOutput[] = [];
  disabled: boolean = false;
  range: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
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
  }
  search_date(): void {
    console.log('search_date: ', this.range.value.start, this.range.value.end);
    this.db
      .sendSearchData({
        start_date: this.range.value.start,
        end_date: this.range.value.end,
      })
      .subscribe(
        (data) => {
          console.log('data incoming: ', data);
          this.Halls = data.data;
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
}
