import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { SectorsService } from '@app/services/sectors/sectors.service';
import { SectorUI, UserUI } from 'types';
import { UserService } from '@app/services/user/user.service';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css'],
})
export class SectorsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'isNeighborhood',
    'isSidewalk',
    'official',
    'createdAt',
    'actions',
  ];
  sectors: SectorUI[] = [];
  officials: UserUI[] = [];

  constructor(
    private sectorService: SectorsService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getSectors();
    this.getOfficials();
  }

  getOfficials() {
    this.userService.getAllOfficials().subscribe({
      next: (response: any) => {
        this.officials = response;
      },
    });
  }

  getSectors() {
    this.sectorService.getSectors().subscribe({
      next: (response: any) => {
        this.sectors = response;
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

  handleView(id: string) {
    this.router.navigate(['/sectors/info'], {
      queryParams: {
        id,
      },
    });
  }

  handleEdit(id: string) {
    this.router.navigate(['/sectors/edit'], {
      queryParams: {
        id,
        edit: true,
      },
    });
  }

  toObject(
    array: Array<{
      name: string;
      id: number;
    }>
  ) {
    console.log(array);
    let object: any = {};
    for (let index = 0; index < array.length; index++) {
      if (array[index] !== undefined)
        object[array[index].id] = array[index].name;
    }

    return object;
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

  assignOrUnAssign(id: string, assign: boolean) {
    const officials = this.officials.map((official) => {
      return {
        name:
          official.firstName +
          (' ' + official.middleName ?? '') +
          (' ' + official.surname ?? '') +
          (' ' + official.lastName ?? ''),
        id: official.id,
      };
    });
    const options = this.toObject(officials);
    if (assign) {
      Swal.fire({
        titleText: 'Escoge un funcionario',
        input: 'select',
        inputOptions: options,
      }).then((result) => {
        if (result.isConfirmed) {
          this.sectorService
            .assignSector({
              official: result.value,
              sector: id,
            })
            .subscribe({
              next: () => {
                this.handleToast('Sector asignado');
              },
              complete: () => {
                this.getSectors();
              },
            });
          return;
        }
      });
      return;
    }

    Swal.fire({
      titleText: '¿Estas seguro uque quieres librar el sector?',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sectorService.unAssignSector(id).subscribe({
          next: () => {
            this.handleToast('Sector liberado');
          },
          complete: () => {
            this.getSectors();
          },
        });
        return;
      }
    });
  }

  handleCreate() {
    this.router.navigate(['/sectors/create']);
  }
}
