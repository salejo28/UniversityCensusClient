import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/animations/principal.json',
  };
  img: string = '/assets/img/petPrincipal.jpeg';
  /* Fields */
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit(e: Event) {
    e.preventDefault();
    console.log(this.loginForm);
  }
}
