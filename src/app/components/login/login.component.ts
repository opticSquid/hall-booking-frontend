import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  imagePath: string;
  constructor() {
    this.imagePath = '/assets/Punjabi.jpg';
  }

  ngOnInit(): void {}
}
