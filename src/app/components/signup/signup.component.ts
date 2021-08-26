import { Component, OnInit } from '@angular/core';
import { SignUp } from '../../SignupTemplate';
import { DbService } from 'src/app/services/db.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  imagePath: string;
  email!: string;
  name!: string;
  password!: string;
  verifyPass!: string;
  role: string = 'user';
  constructor(private db: DbService, private router: Router) {
    this.imagePath = '/assets/takla.jpg';
  }

  ngOnInit(): void {}
  onSubmit(): void {
    if (!this.email || !this.password || !this.verifyPass) {
      alert('Please fill all the fields');
      return;
    }
    if (this.password !== this.verifyPass) {
      alert('Password does not match');
      return;
    } else {
      let signUp: SignUp = {
        email: this.email,
        name: this.name,
        password: this.password,
        role: this.role,
      };
      this.db.signUp(signUp).subscribe(
        (response) => {
          console.log('Signup successful', response);
          alert(response.status);
          this.router.navigate(['']);
        },
        (error) => {
          alert(error);
        },
        () => {
          console.log('Signup complete');
        }
      );
    }
  }
}
