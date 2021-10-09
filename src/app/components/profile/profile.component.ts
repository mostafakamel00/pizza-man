import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotesService } from 'src/app/services/notes.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  pizzaArr: any[] = [];
  searchName: string = '';
  fav: any[] = [];

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router,
    private notes: NotesService,
    private toastr: ToastrService,
    public auth: AuthService,
    private title: Title
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.title.setTitle('Welcome To Home Page');
  }
  ngOnInit(): void {
    this.notes.getPizza().subscribe((res) => {
      console.log(res);
      this.pizzaArr = res.recipes;
    });
    this.scrollY();
  }
  ///////////////////////////////////////////////////////add cart
  addToCart(i: any) {
    if (localStorage.getItem('token') !== null) {
      this.fav = JSON.parse(localStorage.getItem('token')!);
      this.fav.push(this.pizzaArr[i]);
      localStorage.setItem('token', JSON.stringify(this.fav));
    } else {
      this.fav.push(this.pizzaArr[i]);
      localStorage.setItem('token', JSON.stringify(this.fav));
    }
    // console.log('fav', this.fav.length);
  }
  /////////////////////////////////////////////////////////Start Toastr
  showSuccess() {
    this.toastr.success('Favourite Successfully', 'Added To', {
      timeOut: 1500,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }
  /////////////////////////////////////////////////////////End Toastr

  /////////////////////////////////////////////////////////////search
  search() {
    if (this.searchName != '') {
      this.pizzaArr = this.pizzaArr.filter((res) => {
        return res.title
          ?.toLocaleLowerCase()
          .match(this.searchName.toLocaleLowerCase());
      });
    } else {
      this.ngOnInit();
    }
  }
  /////////////////////////////////////////////////////////////search

  ///////////////////////////////////////////////////////////// scroll top
  toTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  scrollY() {
    window.onscroll = function () {
      // console.log(scrollY);
      if (scrollY >= 1072) {
        document.querySelector('.up')?.classList.add('show');
      } else {
        document.querySelector('.up')?.classList.remove('show');
      }
    };
  }
}
