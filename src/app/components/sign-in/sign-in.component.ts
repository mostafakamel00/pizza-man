import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  isBtnNotActive = { 'background-color': 'gray', 'border-color': 'gray' };
  isBtnActive = { 'background-color': '#17a2b8', 'border-color': '#17a2b8' };
  correctPass = '';
  correctPassBoolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private title: Title
  ) {
    this.title.setTitle('Welcome To SignIn Page');
  }
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  formData() {
    // console.log(this.signInForm);
    if (this.signInForm.valid) {
      this.authService.signIn(this.signInForm.value).subscribe((res) => {
        // console.log(res);
        if (res.message == 'success') {
          localStorage.setItem('TOKEN', res.token);
          this.router.navigate(['home']);
        } else {
          this.correctPass = res.message;
          this.correctPassBoolean = true;
        }
      });
    }
  }
  ////////////////////////////////////////background animation
  myAnimated() {
    $('#signIn').particleground({
      parallax: false,
    });
  }

  ngOnInit(): void {
    this.myAnimated();
  }
  goToSignUp() {
    this.router.navigate(['signup']);
  }
}
