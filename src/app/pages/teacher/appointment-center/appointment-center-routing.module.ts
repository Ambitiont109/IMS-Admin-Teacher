import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentCenterComponent } from './appointment-center.component';

const routes: Routes = [{ path: '', component: AppointmentCenterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentCenterRoutingModule { }
