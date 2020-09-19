import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildrenComponent } from './children.component';
import { ChildDetailComponent } from './child-detail/child-detail.component';
import { AddSiblingComponent } from './add-sibling/add-sibling.component';
import { SetChildPWDComponent } from './set-child-pwd/set-child-pwd.component';

const routes: Routes = [
  { path: '', component: ChildrenComponent },
  { path: ':childId/addsiblings', component: AddSiblingComponent },
  { path: ':childId/setpwd', component: SetChildPWDComponent },
  { path: ':childId', component: ChildDetailComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildrenRoutingModule { }
