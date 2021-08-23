import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  elevate: Boolean = true;
  hide_route: string = '/login' || '/signup';
  constructor(private router: Router) {}

  ngOnInit(): void {}
  hasRoute(): boolean {
    return this.router.url !== this.hide_route;
  }
}
