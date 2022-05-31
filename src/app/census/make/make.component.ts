import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimalsService } from '@app/services/animals/animals.service';
import { CensusService } from '@app/services/census/census.service';
import { LocationService } from '@app/services/location/location.service';
import { UserService } from '@app/services/user/user.service';
import Swal from 'sweetalert2';
import { UserUI, AnimalUI } from 'types';

@Component({
  selector: 'app-make',
  templateUrl: './make.component.html',
  styleUrls: ['./make.component.css'],
})
export class MakeComponent implements OnInit {
  fields: any[] = [
    {
      label: 'Dueño',
      type: 'select',
      name: 'owner',
      options: [],
    },
    {
      label: 'Mascota',
      type: 'select',
      name: 'pet',
      options: [],
    },
    {
      label: 'Dirección',
      name: 'location',
      type: 'select',
      options: [],
    },
    {
      label: 'Observaciones',
      name: 'description',
      type: 'text',
    },
  ];
  censusForm = new FormGroup({
    owner: new FormControl('', [Validators.required]),
    pet: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  edit = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private locationService: LocationService,
    private animalService: AnimalsService,
    private censusService: CensusService
  ) {}

  ngOnInit(): void {
    this.handleGetClients();
    this.censusForm.valueChanges.subscribe({
      next: (response) => {
        if (response.owner !== '' && response.location === '') {
          this.handleGetLocationAndPets(response.owner);
        }
      },
    });
  }

  handleGetLocationAndPets(owner: string) {
    this.locationService.getByCient(owner).subscribe({
      next: (response: any) => {
        const fieldLocation = this.fields.find(
          (field) => field.name === 'location'
        );
        if (fieldLocation) {
          this.censusForm.controls['location'].setValue(response.id.toString());
          fieldLocation.options = [
            { value: response.id, label: response.address },
          ];
        }
      },
    });
    this.animalService.myAnimals(owner).subscribe({
      next: (response: any) => {
        const fieldPets = this.fields.find((field) => field.name === 'pet');
        if (fieldPets) {
          fieldPets.options = response.map((animal: AnimalUI) => {
            return {
              value: animal.id,
              label: animal.name,
            };
          });
        }
      },
    });
  }

  handleGetClients() {
    this.userService.search().subscribe({
      next: (response: any) => {
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

  handleSubmit(e: Event) {
    e.preventDefault();
    if (!this.edit) {
      this.censusService.makeCensus(this.censusForm.value).subscribe({
        next: () => {
          this.handleToast('Censo creado');
        },
        error: (err) => {
          this.handleToast(err.error.error, 'error');
        },
        complete: () => this.goBack(),
      });
      return;
    }
  }

  goBack() {
    this.router.navigate(['/census']);
  }
}
