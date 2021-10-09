import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  isBtnNotActive = { 'background-color': 'gray', 'border-color': 'gray' };
  isBtnActive = { 'background-color': '#17a2b8', 'border-color': '#17a2b8' };
  isClicked = false;
  resMsg = '';
  resMsgBoolean = false;
  resErr = '';
  resErrBoolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private title: Title
  ) {
    this.title.setTitle('Welcome To SignUp page');
  }
  signForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    age: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  formData() {
    console.log(this.signForm);
    this.isClicked = true;
    if (this.signForm.value) {
      this.authService.signUp(this.signForm.value).subscribe((res) => {
        // console.log('res', res);
        if (res.message == 'success') {
          this.signForm.reset();
          this.signForm.updateValueAndValidity();
          this.isClicked = false;
          this.resMsg = res.message;
          this.resMsgBoolean = true;
          this.resErrBoolean = false;
        } else {
          this.resErr = res.errors.email.message;
          this.resErrBoolean = true;
          this.resMsgBoolean = false;
          this.isClicked = false;
        }
      });
    }
  }
  /////////////////////////////////////// background animation
  myAnimated() {
    $('#signUp').particleground({
      parallax: false,
    });
  }

  ngOnInit(): void {
    this.myAnimated();
  }
  goToSignIn() {
    this.router.navigate(['signin']);
  }
}
