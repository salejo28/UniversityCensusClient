import { Component, OnInit } from '@angular/core';
import { NavService } from '@app/services/nav/nav.service';
import { UserService } from '@app/services/user/user.service';
import { UserUI } from 'types';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css'],
})
export class AppbarComponent implements OnInit {
  user: UserUI | undefined;
  constructor(
    private navService: NavService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUser.subscribe(
      (value) => (this.user = value as UserUI)
    );
  }

  toggleSideNav() {
    this.navService.setShowSideNav = true;
  }
}
