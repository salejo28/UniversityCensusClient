import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RaceService } from '@app/services/race/race.service';
import { SpeciesService } from '@app/services/species/species.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-race-form',
  templateUrl: './race-form.component.html',
  styleUrls: ['./race-form.component.css'],
})
export class RaceFormComponent implements OnInit {
  fields = [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
    },
    {
      name: 'dangerous',
      label: '¿Es peligrosa?',
      type: 'select',
      options: [
        {
          label: 'Si',
          value: true,
        },
        {
          label: 'No',
          value: false,
        },
      ],
    },
    {
      name: 'specie',
      label: 'Especie',
      type: 'select',
      options: [],
    },
  ];
  edit = false;
  id: string | undefined;
  raceForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    dangerous: new FormControl('', [Validators.required]),
    specie: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private specieService: SpeciesService,
    private raceService: RaceService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.handleGetSpecies();
    const isEdit = this.activatedRoute.snapshot.queryParamMap.get('edit');
    const idRace =
      this.activatedRoute.snapshot.queryParamMap.get('id') || undefined;
    this.edit = isEdit === 'true';
    this.id = idRace;
    if (idRace && isEdit) {
      this.handleGetRace(idRace);
    }
  }

  handleGetRace(id: string) {
    this.raceService.getRace(id).subscribe({
      next: (response: any) => {
        this.fields.map((field) => {
          if (field.name === 'dangerous') {
            this.raceForm.controls['dangerous'].setValue(
              response.dangerous === 1 ? 'true' : 'false'
            );
            return;
          }
          if (field.name === 'specie') {
            const species = this.fields.find(
              (field) => field.name === 'specie'
            )?.options;

            this.raceForm.controls['specie'].setValue(
              species
                ?.find((specie) => specie.label === response.specie)
                ?.value.toString()
            );
            return;
          }

          this.raceForm.controls[field.name].setValue(response[field.name]);
        });
      },
    });
  }

  handleGetSpecies() {
    this.specieService.getAllSpecies().subscribe({
      next: (response: any) => {
        const fieldSpecies = this.fields.find(
          (field) => field.name === 'specie'
        );
        if (fieldSpecies) {
          fieldSpecies.options = response.map((specie: any) => {
            return {
              label: specie.name,
              value: specie.id,
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

  handleSubmit(event: Event) {
    if (!this.edit) {
      this.raceService.createRace(this.raceForm.value).subscribe({
        next: () => {
          this.handleToast('Raza creada');
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

    this.raceService
      .updateRace(this.id as string, this.raceForm.value)
      .subscribe({
        next: () => {
          this.handleToast('Raza actualizada');
        },
        error: (err) => {
          this.handleToast(err.error.error, 'error');
        },
        complete: () => {
          this.goBack();
        },
      });
  }

  goBack() {
    this.router.navigate(['/races']);
  }
}
