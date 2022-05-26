import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RaceService } from '@app/services/race/race.service';
import { RaceUI } from 'types';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css'],
})
export class RacesComponent implements OnInit {
  races: RaceUI[] = [];
  displayedColumns: string[] = ['id', 'name', 'dangerous', 'specie', 'actions'];

  constructor(private router: Router, private raceService: RaceService) {}

  ngOnInit(): void {
    this.getRaces();
  }

  getRaces() {
    this.raceService.getAllRaces().subscribe({
      next: (response: any) => {
        this.races = response;
      },
    });
  }

  handleCreate() {
    this.router.navigate(['/races/create']);
  }

  handleViewRace(id: string) {
    this.router.navigate(['/races/info'], {
      replaceUrl: true,
      queryParamsHandling: null,
      queryParams: {
        id,
      },
    });
  }

  handleEdit(id: string) {
    this.router.navigate(['/races/edit'], {
      replaceUrl: false,
      queryParamsHandling: null,
      queryParams: {
        id,
        edit: true,
      },
    });
  }
}
