import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { FieldRegisterUI } from 'types';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
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
      label: 'Rol',
      name: 'role',
      type: 'select',
      options: [
        {
          label: 'Administrador',
          value: '1',
        },
        {
          label: 'Jefe',
          value: '2',
        },
        {
          label: 'Oficial',
          value: '3',
        },
      ],
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
    role: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private serviceAuth: AuthService) {}

  ngOnInit(): void {
    this.serviceAuth.getTypesIdentification().subscribe({
      next: (response: any) => {
        const fieldTypeOfIdentification = this.fields.find(
          (field) => field.name === 'idType'
        );
        if (fieldTypeOfIdentification) {
          fieldTypeOfIdentification.options = response.map((type: any) => {
            return {
              label: type.abbreviation,
              value: type.value,
            };
          });
        }
      },
      error: (error) => {
        alert('Ocurrio algo inesperado');
      },
    });
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}
