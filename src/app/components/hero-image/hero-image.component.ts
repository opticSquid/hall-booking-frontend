import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-image',
  templateUrl: './hero-image.component.html',
  styleUrls: ['./hero-image.component.css'],
})
export class HeroImageComponent implements OnInit {
  imagePath: string;
  constructor() {
    this.imagePath = '/assets/House.png';
  }

  ngOnInit(): void {}
}
