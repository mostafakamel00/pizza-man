import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
})
export class FavouriteComponent implements OnInit {
  fav: any[] = [];
  alert = false;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private title: Title
  ) {
    this.title.setTitle('Welcome To Favourite page');
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') !== null) {
      this.fav = JSON.parse(localStorage.getItem('token')!);
    }
  }
  delete(i: any) {
    this.fav.splice(i, 1);
    localStorage.setItem('token', JSON.stringify(this.fav));
    this.alert = true;
  }
  deleteSuccess() {
    this.toastr.show('Successfully', 'Deleted', {
      timeOut: 1500,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-top-left',
    });
  }
  goTo() {
    this.router.navigate(['home']);
  }
}
