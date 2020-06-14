import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt.interceptor';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ApplicantComponent } from './components/applicant/applicant.component';
import { OfficeComponent } from './components/office/office.component';
import { InspectorComponent } from './components/inspector/inspector.component';
import { ApplicationsComponent } from './components/office/applications/applications.component';
import { MachineTypePipe } from './pipes/machine-type.pipe';
import { DefinitionsComponent } from './components/office/definitions/definitions.component';
import { InspectionsComponent } from './components/office/inspections/inspections.component';
import { MachinePipe } from './pipes/machine.pipe';
import { MachinesComponent } from './components/office/machines/machines.component';
import { MachineTypesComponent } from './components/office/machine-types/machine-types.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ApplicantComponent,
    OfficeComponent,
    InspectorComponent,
    ApplicationsComponent,
    MachineTypePipe,
    DefinitionsComponent,
    InspectionsComponent,
    MachinePipe,
    MachinesComponent,
    MachineTypesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatGridListModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
