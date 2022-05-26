import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RaceService } from '@app/services/race/race.service';
import { SpeciesService } from '@app/services/species/species.service';
import { RaceUI } from 'types';

@Component({
  selector: 'app-race-info',
  templateUrl: './race-info.component.html',
  styleUrls: ['./race-info.component.css'],
})
export class RaceInfoComponent implements OnInit {
  race: RaceUI | undefined;
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
  raceForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    dangerous: new FormControl('', [Validators.required]),
    specie: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private raceService: RaceService,
    private activatedRoute: ActivatedRoute,
    private specieService: SpeciesService
  ) {}

  ngOnInit(): void {
    this.handleGetSpecies();
    const idRace =
      this.activatedRoute.snapshot.queryParamMap.get('id') || undefined;
    if (idRace) {
      this.handleGetRace(idRace);
    }
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

  handleGetRace(id: string) {
    this.raceService.getRace(id).subscribe({
      next: (response: any) => {
        this.race = response;
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
          this.raceForm.disable();
          this.raceForm.controls[field.name].setValue(response[field.name]);
        });
      },
    });
  }

  handleEdit() {
    this.router.navigate(['/races/edit'], {
      replaceUrl: false,
      queryParamsHandling: null,
      queryParams: {
        id: this.race?.id,
        edit: true,
      },
    });
  }

  goBack() {
    this.router.navigate(['/races']);
  }
}
