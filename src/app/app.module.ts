import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { interceptortproviders } from './helpers/auth.interceptor';
import { AppbarComponent } from './appbar/appbar.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
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

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagenotfoundComponent,
    DashboardComponent,
    AppbarComponent,
    ProfileComponent,
    UsersComponent,
    UserFormComponent,
    UserInfoComponent,
    SpeciesComponent,
    FormSpeciesComponent,
    InfoSpecieComponent,
    RacesComponent,
    RaceFormComponent,
    RaceInfoComponent,
    SectorsComponent,
    FormSectorComponent,
    InfoSectorComponent,
    AnimalsComponent,
    FormAnimalComponent,
    InfoAnimalComponent,
    LocationComponent,
    CensusComponent,
    MakeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    LottieModule.forRoot({ player: playerFactory }),
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTableModule,
    MatAutocompleteModule,
  ],
  providers: [interceptortproviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
