import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user/user.service';
import { UserUI } from 'types';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: UserUI[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'idNumber', 'actions'];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getAllOfficials();
  }

  getAllOfficials() {
    this.userService.getAllOfficials().subscribe({
      next: (response: any) => {
        this.users = response;
      },
      error: (err) => {
        alert('Ocurrio algo inesperado');
      },
    });
  }

  handleEdit(uid: string) {
    this.router.navigate(['/users/edit'], {
      replaceUrl: false,
      queryParamsHandling: null,
      queryParams: {
        edit: true,
        uid,
      },
    });
  }

  handleViewUser(uid: string) {
    this.router.navigate(['/users/info'], {
      replaceUrl: false,
      queryParamsHandling: null,
      queryParams: {
        uid,
      },
    });
  }

  handleCreate() {
    this.router.navigate(['/users/create']);
  }
}
