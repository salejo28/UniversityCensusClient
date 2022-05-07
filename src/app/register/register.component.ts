import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

import { AuthService } from 'services/auth/auth.service';
import { TypeOfIdentification } from 'types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  typesOfIdentifications: TypeOfIdentification[] = [];
  options: AnimationOptions = {
    path: '/assets/animations/principal.json',
  };
  img: string = '/assets/img/petSecondary.jpeg';

  constructor(private service: AuthService) {}

  ngOnInit(): void {
    this.service
      .getTypesIdentification()
      .subscribe((res: any) => (this.typesOfIdentifications = res));
  }
}
