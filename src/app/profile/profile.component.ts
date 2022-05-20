import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { UserService } from '@app/services/user/user.service';
import { FieldRegisterUI, UserUI } from 'types';
import { formatDate } from '@app/utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: UserUI | undefined;
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
      label: 'Fecha de Nacimiento',
      name: 'bornDate',
      type: 'date',
    },
    {
      label: 'Celular',
      name: 'cellphone',
      type: 'text',
    },
    {
      label: 'Correo Eléctronico',
      name: 'email',
      type: 'text',
    },
  ];
  dataUserForm = new FormGroup({
    firstName: new FormControl(
      {
        value: '',
        disabled: true,
      },
      [Validators.required]
    ),
    middleName: new FormControl({
      value: '',
      disabled: true,
    }),
    surname: new FormControl(
      {
        value: '',
        disabled: true,
      },
      [Validators.required]
    ),
    lastName: new FormControl({
      value: '',
      disabled: true,
    }),
    bornDate: new FormControl(
      {
        value: new Date(),
        disabled: true,
      },
      [Validators.required]
    ),
    cellphone: new FormControl(
      {
        value: '',
        disabled: true,
      },
      [Validators.required, Validators.pattern('^[0-9]*$')]
    ),
    email: new FormControl(
      {
        value: '',
        disabled: true,
      },
      [Validators.required, Validators.email]
    ),
  });

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getProfile();
  }

  openModal() {
    const dialogRef = this.dialog.open(DialogChangePassword);
  }

  getProfile() {
    this.userService.profile().subscribe({
      next: (response: any) => {
        this.user = response;
        this.userService.setUser = response;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.dataUserForm.setValue({
          firstName: this.user?.firstName,
          middleName: this.user?.middleName,
          surname: this.user?.surname,
          lastName: this.user?.lastName,
          email: this.user?.email,
          cellphone: this.user?.cellphone ?? '',
          bornDate: this.user?.bornDate
            ? new Date(this.user.bornDate)
            : new Date(),
        });
      },
    });
  }

  toggleDisabledForm(enable?: boolean) {
    enable ? this.dataUserForm.enable() : this.dataUserForm.disable();
  }

  onSubmit(e: Event) {
    e.preventDefault();
    this.userService
      .updateUser(
        {
          ...this.dataUserForm.value,
          bornDate: formatDate(this.dataUserForm.value.bornDate),
        },
        this.user?.id as number
      )
      .subscribe({
        next: (response: any) => {
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
            title: 'Perfil actualizado',
            icon: 'success',
          });
          this.dataUserForm.disable();
        },
        error: (err) => {
          console.error(err);
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
        complete: () => this.getProfile(),
      });
  }
}

@Component({
  selector: 'dialog-change-password',
  templateUrl: 'dialog-change-password.html',
})
export class DialogChangePassword {}
