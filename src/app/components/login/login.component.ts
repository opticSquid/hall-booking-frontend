import { Component, OnInit } from '@angular/core';
import { Login } from '../../LoginTemplate';
import { DbService } from '../../services/db.service';
import { UserExist } from '../../UserExist';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  imagePath: string;
  email!: string;
  pass!: string;

  constructor(private auth: DbService, private route: Router) {
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
    this.auth.login(newLogin).subscribe(
      (data: UserExist) => {
        console.log(data);
        localStorage.setItem('Name', data.Name);
        localStorage.setItem('Token', data.Token);
        localStorage.setItem('Role', data.Role);
        localStorage.setItem('response', data.response);
        alert('login Successful');
        this.route.navigate(['']);
      },
      (err) => {
        console.log(err);
        alert('Login Failed enter correct email and password');
      },
      () => {
        console.log('completed');
      }
    );
  }
}
