import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalsService } from '@app/services/animals/animals.service';
import { RaceService } from '@app/services/race/race.service';
import { UserService } from '@app/services/user/user.service';
import { map, Observable, startWith } from 'rxjs';
import Swal from 'sweetalert2';
import { UserUI, RaceUI } from 'types';

interface Field {
  name: string;
  label: string;
  type: string;
  options?: {
    label: string;
    value: string | number;
  }[];
}

@Component({
  selector: 'app-form-animal',
  templateUrl: './form-animal.component.html',
  styleUrls: ['./form-animal.component.css'],
})
export class FormAnimalComponent implements OnInit {
  clients: UserUI[] | undefined;
  fields: Field[] = [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
    },
    {
      name: 'bornDate',
      label: 'Fecha de Nacimiento',
      type: 'date',
    },
    {
      name: 'race',
      label: 'Raza',
      type: 'select',
      options: [],
    },
    {
      name: 'owner',
      label: 'Dueño',
      type: 'select',
      options: [],
    },
  ];
  edit = false;
  id: string | undefined;
  animalForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    bornDate: new FormControl('', [Validators.required]),
    race: new FormControl('', [Validators.required]),
    owner: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private userService: UserService,
    private raceService: RaceService,
    private animalService: AnimalsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.handleGetRaces();
    this.handleSearchUsers();

    const isEdit = this.activatedRoute.snapshot.queryParamMap.get('edit');
    const idAnimal =
      this.activatedRoute.snapshot.queryParamMap.get('id') || undefined;
    this.edit = isEdit === 'true';
    this.id = idAnimal;
    if (isEdit && idAnimal) {
      this.handleGetAnimal(idAnimal);
    }
  }

  handleGetAnimal(id: string) {
    this.animalService.getAnimal(id).subscribe({
      next: (response: any) => {
        this.fields.map((field) => {
          if (field.name === 'race') {
            this.animalForm.controls['race'].setValue(
              response.raceId.toString()
            );
            return;
          }

          if (field.name === 'bornDate') {
            this.animalForm.controls['bornDate'].setValue(
              new Date(response.bornDate)
            );
            return;
          }

          if (field.name === 'owner') {
            this.animalForm.controls['owner'].setValue(response.ownerId);
            return;
          }

          this.animalForm.controls[field.name].setValue(response[field.name]);
        });
      },
    });
  }

  handleSearchUsers() {
    this.userService.search().subscribe({
      next: (response: any) => {
        this.clients = response;
        const fieldClient = this.fields.find((field) => field.name === 'owner');
        if (fieldClient) {
          fieldClient.options = response.map((client: UserUI) => {
            return {
              value: client.id,
              label:
                client.firstName +
                (' ' + client.middleName ?? '') +
                (' ' + client.surname ?? '') +
                (' ' + client.lastName ?? ''),
            };
          });
        }
      },
    });
  }

  handleGetRaces() {
    this.raceService.getAllRaces().subscribe({
      next: (response: any) => {
        const fieldRace = this.fields.find((field) => field.name === 'race');
        if (fieldRace) {
          fieldRace.options = response.map((race: RaceUI) => {
            return {
              value: race.id,
              label: race.name,
            };
          });
        }
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

  handleFormatDate(date?: Date | string | number) {
    const d = date ? new Date(date) : new Date();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;

    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('/');
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    if (!this.edit) {
      this.animalService
        .createAnimal({
          ...this.animalForm.value,
          bornDate: this.handleFormatDate(this.animalForm.value['bornDate']),
        })
        .subscribe({
          next: () => {
            this.handleToast('Animal Creado');
          },
          error: () => {
            this.handleToast('Ocurrio algo inesperado', 'error');
          },
          complete: () => this.goBack(),
        });
      return;
    }

    this.animalService
      .updateAnimal(
        {
          ...this.animalForm.value,
          bornDate: this.handleFormatDate(this.animalForm.value['bornDate']),
        },
        this.id as string
      )
      .subscribe({
        next: () => {
          this.handleToast('Animal Editado');
        },
        error: () => {
          this.handleToast('Ocurrio algo inesperado', 'error');
        },
        complete: () => this.goBack(),
      });
  }

  goBack() {
    this.router.navigate(['/animals']);
  }
}
