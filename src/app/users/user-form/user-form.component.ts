import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '@app/services/auth/auth.service';
import { UserService } from '@app/services/user/user.service';
import { FieldRegisterUI } from 'types';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  roles = [
    {
      label: 'Administrador',
      value: '1',
      additional: 'admin',
    },
    {
      label: 'Jefe',
      value: '2',
      additional: 'boss',
    },
    {
      label: 'Oficial',
      value: '3',
      additional: 'official',
    },
  ];
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
      options: this.roles,
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
  edit: boolean = false;
  uid: string | undefined;

  constructor(
    private router: Router,
    private serviceAuth: AuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getTypesOfIdentification();
    const isEdit = this.activatedRoute.snapshot.queryParamMap.get('edit');
    const idUser =
      this.activatedRoute.snapshot.queryParamMap.get('uid') || undefined;
    this.edit = isEdit === 'true';
    this.uid = idUser;
    if (idUser) {
      this.handleGetDataUser(idUser);
    }
  }

  handleGetDataUser(uid: string | number) {
    this.userService.getUserById(uid).subscribe({
      next: (response: any) => {
        this.fields.map((field) => {
          if (field.name === 'role') {
            this.registerForm.controls['role'].setValue(
              this.roles.find((role) => role.additional === response.role)
                ?.value
            );
            return;
          }
          this.registerForm.controls[`${field.name}`].setValue(
            response[field.name]
          );
          this.registerForm.controls['idType'].disable();
          this.registerForm.controls['idNumber'].disable();
          this.registerForm.controls['password'].disable();
          this.registerForm.controls['role'].disable();
        });
      },
    });
  }

  getTypesOfIdentification() {
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

  handleToast(message: string, icon?: 'error' | 'success') {
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
      title: message,
      icon: icon ?? 'success',
    });
  }

  handleSubmit(e: Event): void {
    e.preventDefault();
    if (!this.edit) {
      this.userService.createUser(this.registerForm.value).subscribe({
        next: () => {
          this.handleToast('Usuario creado');
        },
        error: (err) => {
          this.handleToast(err.error.error, 'error');
        },
        complete: () => {
          this.goBack();
        },
      });
      return;
    }

    this.userService
      .updateUser(this.registerForm.value, parseInt(this.uid as string))
      .subscribe({
        next: () => {},
        error: (err) => {
          this.handleToast(err.error.error, 'error');
        },
        complete: () => {
          this.goBack();
        },
      });
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}
