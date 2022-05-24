import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeciesService } from '@app/services/species/species.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-species',
  templateUrl: './form-species.component.html',
  styleUrls: ['./form-species.component.css'],
})
export class FormSpeciesComponent implements OnInit {
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
    name: new FormControl('', [Validators.required]),
    isPet: new FormControl('', [Validators.required]),
  });
  edit = false;
  id: string | undefined;

  constructor(
    private router: Router,
    private specieService: SpeciesService,
    private activatedRoute: ActivatedRoute
  ) {
    const isEdit = this.activatedRoute.snapshot.queryParamMap.get('edit');
    const idSpecie =
      this.activatedRoute.snapshot.queryParamMap.get('id') || undefined;
    this.edit = isEdit === 'true';
    this.id = idSpecie;
    if (idSpecie && isEdit) {
      this.handleGetSpecie(idSpecie);
    }
  }

  ngOnInit(): void {}

  handleGetSpecie(id: string) {
    this.specieService.getSpecie(id).subscribe({
      next: (response: any) => {
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
      this.specieService
        .createSpecie({
          ...this.specieForm.value,
          isPet: this.specieForm.value.isPet === 'true',
        })
        .subscribe({
          next: () => {
            this.handleToast('Especie creada');
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

    this.specieService
      .updateSpecie(
        {
          ...this.specieForm.value,
          isPet: this.specieForm.value.isPet === 'true',
        },
        this.id as string
      )
      .subscribe({
        next: () => {
          this.handleToast('Especie actualizada');
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
    this.router.navigate(['/species']);
  }
}
