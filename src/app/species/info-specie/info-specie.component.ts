import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeciesService } from '@app/services/species/species.service';
import { SpecieUI } from 'types';

@Component({
  selector: 'app-info-specie',
  templateUrl: './info-specie.component.html',
  styleUrls: ['./info-specie.component.css'],
})
export class InfoSpecieComponent implements OnInit {
  specie: SpecieUI | undefined;
  fields = [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
    },
    {
      name: 'isPet',
      label: '¿Es mascota?',
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
  ];
  specieForm = new FormGroup({
    name: new FormControl(
      {
        value: '',
        disabled: true,
      },
      [Validators.required]
    ),
    isPet: new FormControl(
      {
        value: '',
        disabled: true,
      },
      [Validators.required]
    ),
  });

  constructor(
    private router: Router,
    private specieService: SpeciesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idSpecie =
      this.activatedRoute.snapshot.queryParamMap.get('id') || undefined;
    if (idSpecie) {
      this.handleGetSpecie(idSpecie);
    }
  }

  handleGetSpecie(id: string) {
    this.specieService.getSpecie(id).subscribe({
      next: (response: any) => {
        this.specie = response;
        this.fields.map((field) => {
          if (field.name === 'isPet') {
            this.specieForm.controls['isPet'].setValue(
              response.isPet === 1 ? 'true' : 'false'
            );
            return;
          }
          this.specieForm.controls[`${field.name}`].setValue(
            response[field.name]
          );
        });
      },
    });
  }

  handleEdit() {
    this.router.navigate(['/species/edit'], {
      replaceUrl: false,
      queryParamsHandling: null,
      queryParams: {
        id: this.specie?.id,
        edit: true,
      },
    });
  }

  goBack() {
    this.router.navigate(['/species']);
  }
}
