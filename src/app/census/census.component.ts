import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CensusService } from '@app/services/census/census.service';
import { SectorsService } from '@app/services/sectors/sectors.service';
import { SectorUI } from 'types';

@Component({
  selector: 'app-census',
  templateUrl: './census.component.html',
  styleUrls: ['./census.component.css'],
})
export class CensusComponent implements OnInit {
  sectors: any[] = [];
  census: any[] = [];
  max = new Date();
  displayedColumns: string[] = [
    'id',
    'ownerName',
    'animalName',
    'officialName',
    'addressLocation',
    'date_census',
    'description',
  ];

  constructor(
    private router: Router,
    private sectorService: SectorsService,
    private censusService: CensusService
  ) {}

  ngOnInit(): void {
    this.handleGetSectors();
    this.handleGetCensus();
  }

  handleGetCensus() {
    this.censusService.getAll().subscribe({
      next: (response: any) => {
        this.census = response;
      },
    });
  }

  handleGetSectors(): void {
    this.sectorService.getSectors().subscribe({
      next: (response: any) => {
        this.sectors = response.map((sector: SectorUI) => {
          return {
            label: sector.name,
            value: sector.id,
          };
        });
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

  handleCreate() {}
}
