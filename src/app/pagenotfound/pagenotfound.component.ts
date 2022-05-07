import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css'],
})
export class PagenotfoundComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/animations/notfound.json',
  };

  constructor(private location: Location) {}

  ngOnInit(): void {}

  back() {
    this.location.back();
  }
}
