import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '@app/login/login.component';
import { RegisterComponent } from '@app/register/register.component';
import { PagenotfoundComponent } from '@app/pagenotfound/pagenotfound.component';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { AuthGuard } from '@app/auth/auth.guard';
import { ProfileComponent } from '@app/profile/profile.component';
import { UsersComponent } from '@app/users/users.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserInfoComponent } from './users/user-info/user-info.component';
import { SpeciesComponent } from './species/species.component';
import { FormSpeciesComponent } from './species/form-species/form-species.component';
import { InfoSpecieComponent } from './species/info-specie/info-specie.component';
import { RacesComponent } from './races/races.component';
import { RaceFormComponent } from './races/race-form/race-form.component';
import { RaceInfoComponent } from './races/race-info/race-info.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'client', 'boss', 'official'],
    },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['client', 'admin'],
    },
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'boss'],
    },
  },
  {
    path: 'users/create',
    component: UserFormComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'boss'],
    },
  },
  {
    path: 'users/edit',
    component: UserFormComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'boss'],
    },
  },
  {
    path: 'users/info',
    component: UserInfoComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'boss'],
    },
  },
  {
    path: 'species',
    component: SpeciesComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'boss'],
    },
  },
  {
    path: 'species/create',
    component: FormSpeciesComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'boss'],
    },
  },
  {
    path: 'species/edit',
    component: FormSpeciesComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'boss'],
    },
  },
  {
    path: 'species/info',
    component: InfoSpecieComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'boss'],
    },
  },
  {
    path: 'races',
    component: RacesComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'boss'],
    },
  },
  {
    path: 'races/edit',
    component: RaceFormComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'boss'],
    },
  },
  {
    path: 'races/create',
    component: RaceFormComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'boss'],
    },
  },
  {
    path: 'races/info',
    component: RaceInfoComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'boss'],
    },
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PagenotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
