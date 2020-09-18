import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

import { ListComponent } from "./list/list.component";
import { AddComponent } from "./add/add.component";
import { RoleGuard } from '../@core/guards/role.guard';
import { USERROLE } from '../@core/models/user';
import { NotFoundComponent } from './not-found/not-found.component';
import { DefaultComponent } from './default/default.component';
import { NotAllowedComponent } from './not-allowed/not-allowed.component';
import { ChooseClassNameComponent } from './choose-class-name/choose-class-name.component';
import { ClassRoomGuard } from '../@core/guards/class-room.guard';
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'choose/classname', component:ChooseClassNameComponent},
      { path: 'children', loadChildren: () => import('./admin/children/children.module').then(m => m.ChildrenModule), canActivate:[ClassRoomGuard] },
      { path: 'profile', loadChildren: () => import('./admin/profile/profile.module').then(m => m.ProfileModule) },
      { 
        path: '', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), 
        canActivate:[RoleGuard],data: {role: USERROLE.Admin, ClassRoomGuard} 
      },      
      { path: 'teacher', loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule), 
        canActivate:[RoleGuard, ClassRoomGuard],data: {role: USERROLE.Teacher} 
      },
      { path: '404', component:NotFoundComponent},
      { path: 'notallowed', component:NotAllowedComponent},
      { path: 'default', component:DefaultComponent},
      {
        path:'list',
        component: ListComponent
      },
      {
        path:'add',
        component:AddComponent
      },
      // {
      //   path:'profile',
      //   loadChildren: () => import('./profile/profile.module')
      //     .then(m => m.ProfileModule),
      // },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
