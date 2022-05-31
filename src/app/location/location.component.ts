import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Leaflet from 'leaflet';

import { SectorsService } from '@app/services/sectors/sectors.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationService } from '@app/services/location/location.service';
import Swal from 'sweetalert2';
import { SectorUI } from 'types';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements AfterViewInit {
  private map: Leaflet.Map | undefined;
  private marker: Leaflet.Marker | undefined;

  isNew = true;
  edit = false;

  fields: any[] = [
    {
      label: 'Dirección',
      type: 'text',
      name: 'address',
    },
    {
      label: 'Sector',
      type: 'select',
      name: 'sector',
      options: [],
    },
  ];

  locationForm = new FormGroup({
    address: new FormControl(
      {
        value: '',
        disabled: !this.edit && !this.isNew,
      },
      [Validators.required]
    ),
    sector: new FormControl(
      {
        value: '',
        disabled: !this.edit && !this.isNew,
      },
      [Validators.required]
    ),
  });

  private initMap(latitude: number, longitude: number): void {
    this.map = Leaflet.map('map', {
      center: [latitude, longitude],
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
    this.marker = Leaflet.marker([latitude, longitude], { icon: Icon }).addTo(
      this.map
    );

    this.map.on('click', (e: Leaflet.LeafletMouseEvent) => {
      if (!this.edit && this.isNew) {
        if (this.marker) {
          this.map?.removeLayer(this.marker);
        }

        this.marker = Leaflet.marker([e.latlng.lat, e.latlng.lng], {
          icon: Icon,
        }).addTo(this.map as Leaflet.Map);
      }
    });
  }

  constructor(
    private router: Router,
    private sectorService: SectorsService,
    private locationService: LocationService
  ) {}

  ngAfterViewInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.initMap(position.coords.latitude, position.coords.longitude);
    });
    this.handleGetSectors();
    this.handleGetLocation();
  }

  handleGetLocation() {
    this.locationService.getLocation().subscribe({
      next: (response: any) => {
        if (response) {
          this.isNew = false;
          this.locationForm.disable();
          this.locationForm.controls['address'].setValue(response.address);
          this.locationForm.controls['sector'].setValue(
            response.sectorId.toString()
          );
        }
      },
    });
  }

  handleGetSectors() {
    this.sectorService.getSectors().subscribe({
      next: (response: any) => {
        const fieldSector = this.fields.find(
          (field) => field.name === 'sector'
        );
        if (fieldSector) {
          fieldSector.options = response.map((sector: SectorUI) => {
            return {
              value: sector.id,
              label: sector.name,
            };
          });
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

  handleSubmit(e: Event) {
    e.preventDefault();
    if (this.isNew && !this.edit) {
      this.locationService
        .createLocation({
          ...this.locationForm.value,
          geo: {
            lat: this.marker?.getLatLng().lat,
            lng: this.marker?.getLatLng().lng,
          },
        })
        .subscribe({
          next: () => {
            this.handleToast('Dirección creada');
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
  }

  goBack() {
    this.router.navigate(['/profile']);
  }
}
