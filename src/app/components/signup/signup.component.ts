import { Component, OnInit } from '@angular/core';

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
  constructor() {
    this.imagePath = '/assets/takla.jpg';
  }

  ngOnInit(): void {}
  onSubmit():void{
    if(!this.email || !this.password || !this.verifyPass){
      alert("Please fill all the fields");
      return;
    }
    if(this.password !== this.verifyPass){
      alert("Password does not match");
      return;
    }
  }
}
