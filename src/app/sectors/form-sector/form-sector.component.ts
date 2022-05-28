import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SectorsService } from '@app/services/sectors/sectors.service';
import { UserService } from '@app/services/user/user.service';
import * as Leaflet from 'leaflet';
import Swal from 'sweetalert2';
import { UserUI } from 'types';

@Component({
  selector: 'app-form-sector',
  templateUrl: './form-sector.component.html',
  styleUrls: ['./form-sector.component.css'],
})
export class FormSectorComponent implements AfterViewInit {
  private map: Leaflet.Map | undefined;
  private marker: Leaflet.Marker | undefined;
  private markerEnd: Leaflet.Marker | undefined;
  private center: Leaflet.LatLngExpression = [
    4.862418173896035, -74.06027765013279,
  ];
  private centerEnd: Leaflet.LatLngExpression = [
    4.862474673398629, -74.06094610691072,
  ];
  selectedEnd: boolean = false;
  selectedStart: boolean = false;
  edit = false;
  id: string | undefined;
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
    name: new FormControl('', [Validators.required]),
    isNeighborhood: new FormControl('', [Validators.required]),
    isSidewalk: new FormControl('', [Validators.required]),
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
      .bindPopup('Desde')
      .on('click', (e: Leaflet.LeafletMouseEvent) => {
        this.selectedStart = true;
      });
    this.markerEnd = Leaflet.marker(this.centerEnd, {
      icon: Icon,
    })
      .addTo(this.map)
      .bindPopup('Hasta')
      .on('click', (e: Leaflet.LeafletMouseEvent) => {
        this.selectedEnd = true;
      });

    this.map.on('click', (e: Leaflet.LeafletMouseEvent) => {
      if (this.selectedEnd) {
        if (this.markerEnd) {
          this.map?.removeLayer(this.markerEnd);
        }
        this.sectorForm.controls['end'].setValue(
          `${e.latlng.lat}, ${e.latlng.lng}`
        );
        this.markerEnd = Leaflet.marker([e.latlng.lat, e.latlng.lng], {
          icon: Icon,
        })
          .addTo(this.map as Leaflet.Map)
          .bindPopup('Hasta')
          .on('click', (e: Leaflet.LeafletMouseEvent) => {
            this.selectedEnd = true;
          });
        this.selectedEnd = false;
      }

      if (this.selectedStart) {
        if (this.marker) {
          this.map?.removeLayer(this.marker);
        }
        this.sectorForm.controls['start'].setValue(
          `${e.latlng.lat}, ${e.latlng.lng}`
        );
        this.marker = Leaflet.marker([e.latlng.lat, e.latlng.lng], {
          icon: Icon,
        })
          .addTo(this.map as Leaflet.Map)
          .bindPopup('Desde')
          .on('click', (e: Leaflet.LeafletMouseEvent) => {
            this.selectedStart = true;
          });
        this.selectedStart = false;
      }
    });
  }

  constructor(
    private router: Router,
    private userService: UserService,
    private sectorService: SectorsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
    const isEdit = this.activatedRoute.snapshot.queryParamMap.get('edit');
    const idSector =
      this.activatedRoute.snapshot.queryParamMap.get('id') || undefined;
    this.edit = isEdit === 'true';
    this.id = idSector;
    if (idSector && isEdit) {
      this.handleGetSector(idSector);
    }
    this.getOfficials();
  }

  handleGetSector(id: string) {
    this.sectorService.getSector(id).subscribe({
      next: (response: any) => {
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
              .bindPopup('Desde')
              .on('click', (e: Leaflet.LeafletMouseEvent) => {
                this.selectedStart = true;
              });
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
              .bindPopup('Hasta')
              .on('click', (e: Leaflet.LeafletMouseEvent) => {
                this.selectedEnd = true;
              });
            return;
          }

          this.sectorForm.controls[field.name].setValue(
            response[field.name].toString()
          );
        });
      },
    });
  }

  getOfficials() {
    this.userService.getAllOfficials().subscribe({
      next: (response: any) => {
        const fieldOfficials = this.fields.find(
          (field) => field.name === 'official'
        );
        if (fieldOfficials) {
          const options = response.map((official: UserUI) => {
            return {
              label:
                official.firstName +
                (' ' + official?.middleName ?? '') +
                ' ' +
                official.surname +
                (' ' + official.lastName ?? ''),
              value: official.id,
            };
          });
          fieldOfficials.options = options;
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

  handleSubmit(e: Event): void {
    const latLngStart = this.marker?.getLatLng();
    const latLngEnd = this.markerEnd?.getLatLng();
    if (
      JSON.stringify(latLngStart) === JSON.stringify(this.center) ||
      JSON.stringify(latLngEnd) === JSON.stringify(this.centerEnd)
    ) {
      this.handleToast('El comienzo y el fin son requeridos', 'error');
      return;
    }

    if (!this.edit) {
      this.sectorService
        .createSector({
          ...this.sectorForm.value,
          start: {
            lat: latLngStart?.lat,
            lng: latLngStart?.lng,
          },
          end: {
            lat: latLngEnd?.lat,
            lng: latLngEnd?.lng,
          },
          isNeighborhood: this.sectorForm.value['isNeighborhood'] === 'true',
          isSidewalk: this.sectorForm.value['isSidewalk'] === 'true',
        })
        .subscribe({
          next: () => {
            this.handleToast('Sector creado');
          },
          error: (err) => {
            this.handleToast(err.error.error, 'error');
          },
          complete: () => this.goBack(),
        });
      return;
    }

    this.sectorService
      .updateSector(
        {
          ...this.sectorForm.value,
          start: JSON.stringify({
            lat: latLngStart?.lat,
            lng: latLngStart?.lng,
          }),
          end: JSON.stringify({
            lat: latLngEnd?.lat,
            lng: latLngEnd?.lng,
          }),
          isNeighborhood: this.sectorForm.value['isNeighborhood'] === 'true',
          isSidewalk: this.sectorForm.value['isSidewalk'] === 'true',
        },
        this.id as string
      )
      .subscribe({
        next: () => {
          this.handleToast('Sector editado');
        },
        error: (err) => {
          this.handleToast(err.error.error, 'error');
        },
        complete: () => this.goBack(),
      });
  }

  goBack() {
    this.router.navigate(['/sectors']);
  }
}
