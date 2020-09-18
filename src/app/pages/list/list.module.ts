import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule, NbIconModule, NbButtonModule, NbInputModule, NbListModule, NbTooltipModule, NbStepperModule, NbSelectModule, NbDialogModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from '../detail/detail.component';
import { AddComponent } from "../add/add.component";

@NgModule({
  declarations: [ListComponent, DetailComponent, AddComponent],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    FormsModule,
    NbListModule,
    NbTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbTooltipModule,
    NbIconModule,       
    NbDialogModule,
  ]
})
export class ListModule { }
