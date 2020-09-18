import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PicturesRoutingModule } from './pictures-routing.module';
import { PicturesComponent } from './pictures.component';
import { AddComponent } from './add/add.component';
import { NbCardModule, NbButtonModule, NbIconModule, NbUserModule } from '@nebular/theme';
import { NgxDropzoneModule } from "ngx-dropzone";
import { NgxFileUploadCoreModule } from "@ngx-file-upload/core";
import { NgxFileUploadUiProgressbarModule, NgxFileUploadUiCommonModule, NgxFileUploadUiToolbarModule } from "@ngx-file-upload/ui";
import { SharedModule } from '../../../shared/shared.module';
import { UserListModule } from '../../../shared/user-list/user-list.module';
import { PictureDetailComponent } from './picture-detail/picture-detail.component';


@NgModule({
  declarations: [PicturesComponent, AddComponent, PictureDetailComponent],
  imports: [
    CommonModule,
    PicturesRoutingModule,
    SharedModule,
    UserListModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    NbUserModule,
    
    NgxDropzoneModule,
    /**
     * !notice required import of NgxFileUploadCoreModule only in root of app
     */
    NgxFileUploadCoreModule,
    /**
     * NgxFileUploadUiCommonModule for pipes
     * NgxFileUploadUiProgressbarModule for circle progressbar
     * NgxFileUploadUiToolbarModule for toolbar
     */
    NgxFileUploadUiCommonModule,
    NgxFileUploadUiProgressbarModule,
    NgxFileUploadUiToolbarModule
  ]
})
export class PicturesModule { }
