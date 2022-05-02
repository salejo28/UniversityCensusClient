import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/principal.json',
  };
  constructor() {}

  ngOnInit(): void {}
}
