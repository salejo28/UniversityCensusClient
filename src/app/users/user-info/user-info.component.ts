import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '@app/services/user/user.service';
import { UserUI, FieldRegisterUI } from 'types';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
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
    firstName: new FormControl({
      value: '',
      disabled: true,
    }),
    middleName: new FormControl({
      value: '',
      disabled: true,
    }),
    surname: new FormControl({
      value: '',
      disabled: true,
    }),
    lastName: new FormControl({
      value: '',
      disabled: true,
    }),
    bornDate: new FormControl({
      value: new Date(),
      disabled: true,
    }),
    cellphone: new FormControl({
      value: '',
      disabled: true,
    }),
    email: new FormControl({
      value: '',
      disabled: true,
    }),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idUser =
      this.activatedRoute.snapshot.queryParamMap.get('uid') || undefined;
    if (idUser) {
      this.handleGetDataUser(idUser);
    }
  }

  handleEdit() {
    this.router.navigate(['/users/edit'], {
      replaceUrl: false,
      queryParamsHandling: null,
      queryParams: {
        edit: true,
        uid: this.user?.id,
      },
    });
  }

  handleGetDataUser(uid: string | number) {
    this.userService.getUserById(uid).subscribe({
      next: (response: any) => {
        this.user = response;
        this.dataUserForm.setValue({
          firstName: response.firstName,
          middleName: response.middleName,
          surname: response.surname,
          lastName: response.lastName,
          email: response.email,
          cellphone: response.cellphone ?? 'No indica',
          bornDate: response.bornDate
            ? new Date(response.bornDate)
            : new Date(),
        });
      },
    });
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}
