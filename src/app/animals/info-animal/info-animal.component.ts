import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalsService } from '@app/services/animals/animals.service';
import { AnimalUI } from 'types';

@Component({
  selector: 'app-info-animal',
  templateUrl: './info-animal.component.html',
  styleUrls: ['./info-animal.component.css'],
})
export class InfoAnimalComponent implements OnInit {
  animal: AnimalUI | undefined;
  fields = [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
    },
    {
      name: 'bornDate',
      label: 'Fecha de Nacimiento',
      type: 'text',
    },
    {
      name: 'race',
      label: 'Raza',
      type: 'text',
      options: [],
    },
    {
      name: 'owner',
      label: 'Dueño',
      type: 'text',
      options: [],
    },
  ];
  animalForm = new FormGroup({
    name: new FormControl(
      {
        disabled: true,
        value: '',
      },
      [Validators.required]
    ),
    bornDate: new FormControl(
      {
        disabled: true,
        value: '',
      },
      [Validators.required]
    ),
    race: new FormControl(
      {
        disabled: true,
        value: '',
      },
      [Validators.required]
    ),
    owner: new FormControl(
      {
        disabled: true,
        value: '',
      },
      [Validators.required]
    ),
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private serviceAnimal: AnimalsService
  ) {}

  ngOnInit(): void {
    const idAnimal =
      this.activatedRoute.snapshot.queryParamMap.get('id') || undefined;
    if (idAnimal) {
      this.handleGetAnimal(idAnimal);
    }
  }

  handleGetAnimal(id: string) {
    this.serviceAnimal.getAnimal(id).subscribe({
      next: (response: any) => {
        this.animal = response;
        this.fields.map((field) => {
          this.animalForm.controls[field.name].setValue(response[field.name]);
        });
      },
    });
  }

  handleEdit() {
    this.router.navigate(['/animals/edit'], {
      queryParams: {
        edit: true,
        id: this.animal?.id,
      },
    });
  }

  goBack() {
    this.router.navigate(['/animals']);
  }
}
