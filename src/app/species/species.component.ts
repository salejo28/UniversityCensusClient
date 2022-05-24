import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpeciesService } from '@app/services/species/species.service';
import { SpecieUI } from 'types';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css'],
})
export class SpeciesComponent implements OnInit {
  species: SpecieUI[] = [];
  displayedColumns: string[] = ['id', 'name', 'isPet', 'createdAt', 'actions'];

  constructor(private router: Router, private specieService: SpeciesService) {}

  ngOnInit(): void {
    this.specieService.getAllSpecies().subscribe({
      next: (response: any) => {
        this.species = response;
      },
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

  handleCreate() {
    this.router.navigate(['/species/create']);
  }

  handleViewSpecie(id: string) {
    this.router.navigate(['/species/info'], {
      replaceUrl: false,
      queryParamsHandling: null,
      queryParams: {
        id,
      },
    });
  }

  handleEdit(id: string) {
    this.router.navigate(['/species/edit'], {
      replaceUrl: false,
      queryParamsHandling: null,
      queryParams: {
        id,
        edit: true,
      },
    });
  }
}
