import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolDocumentsRoutingModule } from './school-documents-routing.module';
import { SchoolDocumentsComponent } from './school-documents.component';
import { NbCardModule, NbListModule, NbIconModule, NbButtonModule, NbTooltipModule, NbTabsetModule, NbSelectModule } from '@nebular/theme';
import { AddDocumentComponent } from './add-document/add-document.component';
import { NgxFileUploadUiProgressbarModule, NgxFileUploadUiCommonModule, NgxFileUploadUiFileBrowserModule, NgxFileUploadUiModule } from '@ngx-file-upload/ui';
import { NgxFileUploadCoreModule } from '@ngx-file-upload/core';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [SchoolDocumentsComponent, AddDocumentComponent],
  imports: [
    CommonModule,
    SchoolDocumentsRoutingModule,
    NbCardModule,
    NbListModule,
    NbSelectModule,
    NbIconModule,
    NbButtonModule,
    NbTooltipModule,
    NbTabsetModule,
    NgxFileUploadUiCommonModule,
    NgxFileUploadUiProgressbarModule,
    NgxFileUploadUiFileBrowserModule,
    NgxFileUploadCoreModule,
    NgxDropzoneModule,
    NgxFileUploadUiModule
    
  ]
})
export class SchoolDocumentsModule { }
