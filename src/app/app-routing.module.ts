import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '@app/login/login.component';
import { RegisterComponent } from '@app/register/register.component';
import { PagenotfoundComponent } from '@app/pagenotfound/pagenotfound.component';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { AuthGuard } from '@app/auth/auth.guard';
import { ProfileComponent } from '@app/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
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
      roles: ['client'],
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
