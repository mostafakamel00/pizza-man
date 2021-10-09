import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  fav: any[] = [];

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {}
  logOut() {
    localStorage.clear();
    this.router.navigate(['signin']);
  }
}
