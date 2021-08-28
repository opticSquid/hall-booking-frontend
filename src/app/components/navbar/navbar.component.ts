import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../../services/db.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  elevate: Boolean = true;
  hide_route: string = '/login' || '/signup';
  constructor(private auth: DbService, private router: Router) {
  }

  ngOnInit(): void {}
  hasRoute(): boolean {
    return this.router.url !== this.hide_route;
  }
  logout(): void {
    let token = localStorage.getItem('Token');
    this.auth.logout(token).subscribe(
      (data) => {
        console.log('User logged out: ', data);
        alert('user logged out');
        localStorage.removeItem('Token');
        localStorage.removeItem('Name');
        localStorage.removeItem('Role');
        localStorage.removeItem('response');
        this.router.navigate(['']);
      },
      (err) => {
        console.log('Error occured in logging out', err);
        alert('error logging out');
      },
      () => {
        console.log('Logout observable completed');
      }
    );
  }
  navButton(): void {
    if (localStorage.getItem('Token') !== null) {
      this.logout();
    } else {
      this.router.navigate(['login']);
    }
  }
}
