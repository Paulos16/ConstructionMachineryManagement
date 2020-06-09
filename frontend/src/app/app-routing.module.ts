import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ApplicantComponent } from './applicant/applicant.component';
import { InspectorComponent } from './inspector/inspector.component';
import { OfficeComponent } from './office/office.component';
import { AuthGuard } from './helpers/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'applicant', component: ApplicantComponent, canActivate: [AuthGuard] },
  { path: 'inspector', component: InspectorComponent, canActivate: [AuthGuard] },
  { path: 'office', component: OfficeComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
