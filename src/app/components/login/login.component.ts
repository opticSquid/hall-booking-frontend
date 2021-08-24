import { Component, OnInit } from '@angular/core';
import { Login } from '../../LoginTemplate';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  imagePath: string;
  email!: string;
  pass!: string;

  constructor() {
    this.imagePath = '/assets/Punjabi.jpg';
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.email || !this.pass) {
      alert('Please enter email and password');
    }
    const newLogin: Login = {
      email: this.email,
      password: this.pass,
    };
    console.log('form Submitted', newLogin);
  }
}
