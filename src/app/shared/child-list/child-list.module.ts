import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildListComponent } from './child-list/child-list.component';
import { ChildCellComponent } from './child-cell/child-cell.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { NbIconModule, NbButtonModule, NbInputModule, NbUserModule } from '@nebular/theme';




@NgModule({
  declarations: [ChildListComponent, ChildCellComponent],
  imports: [
    CommonModule,
    FormsModule,
    NbInputModule,
    NbIconModule,
    NbButtonModule,
    NbUserModule,
    Ng2SmartTableModule
  ],
  exports:[
    ChildListComponent,
    
  ]
})
export class ChildListModule { }
