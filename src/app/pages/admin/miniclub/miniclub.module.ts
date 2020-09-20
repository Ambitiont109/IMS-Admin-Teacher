import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiniclubRoutingModule } from './miniclub-routing.module';
import { MiniclubComponent } from './miniclub.component';
import { NbAccordionModule, NbBadgeModule, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbListModule, NbTooltipModule, NbUserModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedTranslateModule } from '../../../shared-translate/shared-translate.module';
import { NewClubComponent } from './new-club/new-club.component';
import { ClubFormComponent } from './club-form/club-form.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';


@NgModule({
  declarations: [MiniclubComponent, NewClubComponent, ClubFormComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbInputModule,
    NbListModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbAccordionModule,
    NbUserModule,
    NbBadgeModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SharedTranslateModule,
    MiniclubRoutingModule
  ]
})
export class MiniclubModule { }
