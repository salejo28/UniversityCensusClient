import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { AuthService } from 'services/auth/auth.service';

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const signin = localStorage.getItem('signin');
    if (signin === 'true') {
      location.replace('http://localhost:4200/dashboard');
    }
  }

  onSubmit(e: Event) {
    e.preventDefault();
    this.authService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        localStorage.setItem('signin', response.success);
        this.authService.setLoggedIn = true;
      },
      error: (err) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          timer: 4000,
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        Toast.fire({
          title: err.error.error,
          icon: 'error',
        });
      },
      complete: () => location.replace('http://localhost:4200/dashboard'),
    });
  }
}
