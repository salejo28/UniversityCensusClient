import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalsService } from '@app/services/animals/animals.service';
import { AnimalUI } from 'types';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css'],
})
export class AnimalsComponent implements OnInit {
  animals: AnimalUI[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'bornDate',
    'owner',
    'race',
    'actions',
  ];

  constructor(private animalService: AnimalsService, private router: Router) {}

  ngOnInit(): void {
    this.getAnimals();
  }

  handleCreate() {
    this.router.navigate(['/animals/create']);
  }

  handleEdit(id: string) {
    this.router.navigate(['/animals/edit'], {
      queryParams: {
        edit: true,
        id,
      },
    });
  }

  handleView(id: string) {
    this.router.navigate(['/animals/info'], {
      queryParams: {
        id,
      },
    });
  }

  getAnimals() {
    this.animalService.getAnimals().subscribe({
      next: (response: any) => {
        console.log(response);
        this.animals = response;
      },
    });
  }
}
