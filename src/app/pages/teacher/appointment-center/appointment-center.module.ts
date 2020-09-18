import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';

import { AppointmentCenterRoutingModule } from './appointment-center-routing.module';
import { AppointmentCenterComponent } from './appointment-center.component';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbToggleModule, NbButtonModule, NbBadgeModule, NbUserModule, NbInputModule, NbIconModule, NbCheckboxModule } from '@nebular/theme';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [AppointmentCenterComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    AppointmentCenterRoutingModule,
    NbCardModule,
    NbCheckboxModule,
    NbButtonModule,
    NbBadgeModule,
    NbUserModule,
    NbInputModule,
    NbIconModule,

    FormsModule,
    OwlDateTimeModule,     
    OwlNativeDateTimeModule,
  ]
})
export class AppointmentCenterModule { }
