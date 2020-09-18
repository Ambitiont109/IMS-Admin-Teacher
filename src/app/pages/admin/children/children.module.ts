import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildrenRoutingModule } from './children-routing.module';
import { ChildrenComponent } from './children.component';
import { ChildListModule } from '../../../shared/child-list/child-list.module';
import { NbCardModule, NbButtonModule, NbIconModule, NbTooltipModule, NbUserModule } from '@nebular/theme';
import { ChildDetailComponent } from './child-detail/child-detail.component';


@NgModule({
  declarations: [ChildrenComponent, ChildDetailComponent],
  imports: [
    CommonModule,
    ChildrenRoutingModule,
    ChildListModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbCardModule,
    NbUserModule,
  ]
})
export class ChildrenModule { }
