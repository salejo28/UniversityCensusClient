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
import { SectorsComponent } from './sectors/sectors.component';
import { FormSectorComponent } from './sectors/form-sector/form-sector.component';
import { InfoSectorComponent } from './sectors/info-sector/info-sector.component';
import { AnimalsComponent } from './animals/animals.component';
import { FormAnimalComponent } from './animals/form-animal/form-animal.component';
import { InfoAnimalComponent } from './animals/info-animal/info-animal.component';
import { LocationComponent } from './location/location.component';
import { CensusComponent } from './census/census.component';
import { MakeComponent } from './census/make/make.component';

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
    path: 'sectors',
    component: SectorsComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'boss'],
    },
  },
  {
    path: 'sectors/create',
    component: FormSectorComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'boss'],
    },
  },
  {
    path: 'sectors/edit',
    component: FormSectorComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'boss'],
    },
  },
  {
    path: 'sectors/info',
    component: InfoSectorComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'boss'],
    },
  },
  {
    path: 'animals',
    component: AnimalsComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'boss', 'official'],
    },
  },
  {
    path: 'animals/create',
    component: FormAnimalComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'boss', 'official'],
    },
  },
  {
    path: 'animals/edit',
    component: FormAnimalComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'boss', 'official'],
    },
  },
  {
    path: 'animals/info',
    component: InfoAnimalComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['admin', 'boss', 'official'],
    },
  },
  {
    path: 'location',
    component: LocationComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['client'],
    },
  },
  {
    path: 'census',
    component: CensusComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['official', 'admin', 'boss'],
    },
  },
  {
    path: 'census/make',
    component: MakeComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['official', 'admin'],
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
