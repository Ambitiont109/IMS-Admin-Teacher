import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildrenRoutingModule } from './children-routing.module';
import { ChildrenComponent } from './children.component';
import { ChildListModule } from '../../../shared/child-list/child-list.module';
import { NbCardModule, NbButtonModule, NbIconModule, NbTooltipModule, NbUserModule, NbInputModule, NbPopoverModule } from '@nebular/theme';
import { ChildDetailComponent } from './child-detail/child-detail.component';
import { AddSiblingComponent } from './add-sibling/add-sibling.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedTranslateModule } from '../../../shared-translate/shared-translate.module';
import { SetChildPWDComponent } from './set-child-pwd/set-child-pwd.component';


@NgModule({
  declarations: [ChildrenComponent, ChildDetailComponent, AddSiblingComponent, SetChildPWDComponent],
  imports: [
    CommonModule,
    ChildrenRoutingModule,
    ChildListModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbCardModule,
    NbInputModule,
    NbUserModule,
    NbPopoverModule,
    SharedTranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ChildrenModule { }
