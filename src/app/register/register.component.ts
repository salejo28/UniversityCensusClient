import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { AuthService } from 'services/auth/auth.service';
import { TypeOfIdentificationUI, FieldRegisterUI } from 'types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  typesOfIdentifications: TypeOfIdentificationUI[] = [];
  options: AnimationOptions = {
    path: '/assets/animations/principal.json',
  };
  img: string = '/assets/img/petSecondary.jpeg';
  fields: FieldRegisterUI[] = [
    {
      label: 'Primer Nombre',
      name: 'firstName',
      type: 'text',
    },
    {
      label: 'Segundo Nombre',
      name: 'middleName',
      type: 'text',
    },
    {
      label: 'Primer Apellido',
      name: 'surname',
      type: 'text',
    },
    {
      label: 'Segundo Apellido',
      name: 'lastName',
      type: 'text',
    },
    {
      label: 'Tipo de Documento',
      name: 'idType',
      type: 'select',
    },
    {
      label: 'Número de Documento',
      name: 'idNumber',
      type: 'text',
    },
    {
      label: 'Correo Eléctronico',
      name: 'email',
      type: 'text',
    },
    {
      label: 'Contraseña',
      name: 'password',
      type: 'password',
    },
  ];
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    middleName: new FormControl(''),
    surname: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    idType: new FormControl('', [Validators.required]),
    idNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private service: AuthService) {}

  ngOnInit(): void {
    this.service
      .getTypesIdentification()
      .subscribe((res: any) => (this.typesOfIdentifications = res));
  }

  handleSubmit(e: Event): void {
    e.preventDefault();
    console.log(this.registerForm.value);
  }
}
