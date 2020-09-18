import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildrenComponent } from './children.component';
import { ChildDetailComponent } from './child-detail/child-detail.component';

const routes: Routes = [
  { path: '', component: ChildrenComponent },
  { path: ':childId', component: ChildDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildrenRoutingModule { }
