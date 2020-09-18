import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PicturesComponent } from './pictures.component';
import { AddComponent } from './add/add.component';
import { PictureDetailComponent } from './picture-detail/picture-detail.component';

const routes: Routes = [
  { path: '', component: PicturesComponent },
  { path:'detail/:childId', component:PictureDetailComponent},
  { path: 'add/:childId', component: AddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PicturesRoutingModule { }
