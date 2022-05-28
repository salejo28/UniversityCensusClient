import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SectorUI } from 'types';
import * as Leaflet from 'leaflet';
import { SectorsService } from '@app/services/sectors/sectors.service';

@Component({
  selector: 'app-info-sector',
  templateUrl: './info-sector.component.html',
  styleUrls: ['./info-sector.component.css'],
})
export class InfoSectorComponent implements AfterViewInit {
  sector: SectorUI | undefined;
  private map: Leaflet.Map | undefined;
  private marker: Leaflet.Marker | undefined;
  private markerEnd: Leaflet.Marker | undefined;
  private center: Leaflet.LatLngExpression = [
    4.862418173896035, -74.06027765013279,
  ];
  private centerEnd: Leaflet.LatLngExpression = [
    4.862474673398629, -74.06094610691072,
  ];
  fields = [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
    },
    {
      name: 'isNeighborhood',
      label: '¿Es barrio?',
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
      name: 'isSidewalk',
      label: '¿Es vereda?',
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
      name: 'start',
      label: 'Desde',
      type: 'text',
    },
    {
      name: 'end',
      label: 'Hasta',
      type: 'text',
    },
  ];
  sectorForm = new FormGroup({
    name: new FormControl(
      {
        disabled: true,
        value: '',
      },
      [Validators.required]
    ),
    isNeighborhood: new FormControl(
      {
        disabled: true,
        value: '',
      },
      [Validators.required]
    ),
    isSidewalk: new FormControl(
      {
        disabled: true,
        value: '',
      },
      [Validators.required]
    ),
    start: new FormControl(
      {
        value: '',
        disabled: true,
      },
      [Validators.required]
    ),
    end: new FormControl(
      {
        value: '',
        disabled: true,
      },
      [Validators.required]
    ),
  });

  private initMap(): void {
    this.map = Leaflet.map('map', {
      center: this.center,
      zoom: 18,
    });

    const tiles = Leaflet.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        minZoom: 15,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);

    const Icon = Leaflet.icon({
      iconUrl: '/assets/img/marker.png',
    });
    this.marker = Leaflet.marker(this.center, { icon: Icon })
      .addTo(this.map)
      .bindPopup('Desde');

    this.markerEnd = Leaflet.marker(this.centerEnd, {
      icon: Icon,
    })
      .addTo(this.map)
      .bindPopup('Hasta');
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sectorService: SectorsService
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
    const idSector =
      this.activatedRoute.snapshot.queryParamMap.get('id') || undefined;
    if (idSector) {
      this.handleGetSector(idSector);
    }
  }

  handleGetSector(id: string) {
    this.sectorService.getSector(id).subscribe({
      next: (response: any) => {
        this.sector = response;
        const Icon = Leaflet.icon({
          iconUrl: '/assets/img/marker.png',
        });
        this.fields.map((field) => {
          if (field.name === 'start') {
            if (this.marker) {
              this.map?.removeLayer(this.marker);
            }
            this.sectorForm.controls['start'].setValue(
              `${response.start.lat}, ${response.start.lng}`
            );
            this.marker = Leaflet.marker(
              [response.start.lat, response.start.lng],
              {
                icon: Icon,
              }
            )
              .addTo(this.map as Leaflet.Map)
              .bindPopup('Desde');

            return;
          }

          if (field.name === 'end') {
            if (this.markerEnd) {
              this.map?.removeLayer(this.markerEnd);
            }
            this.sectorForm.controls['end'].setValue(
              `${response.end.lat}, ${response.end.lng}`
            );
            this.markerEnd = Leaflet.marker(
              [response.end.lat, response.end.lng],
              {
                icon: Icon,
              }
            )
              .addTo(this.map as Leaflet.Map)
              .bindPopup('Hasta');

            return;
          }

          this.sectorForm.controls[field.name].setValue(
            response[field.name].toString()
          );
        });
      },
    });
  }

  handleEdit() {
    this.router.navigate(['/sectors/edit'], {
      queryParams: {
        id: this.sector?.id,
        edit: true,
      },
    });
  }

  goBack() {
    this.router.navigate(['/sectors']);
  }
}
