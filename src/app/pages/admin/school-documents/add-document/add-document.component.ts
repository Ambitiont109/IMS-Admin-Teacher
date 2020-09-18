import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { NgxFileUploadStorage, NgxFileUploadRequest,NgxFileUploadOptions, NgxFileUploadState, NgxFileUploadFactory } from "@ngx-file-upload/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DocumentsService } from '../../../../@core/services/documents.service';
import { DocumentFor } from '../../../../@core/models/document';

@Component({
  selector: 'ngx-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {
  selectList:any;
  public uploadStates = NgxFileUploadState;
public uploads: NgxFileUploadRequest[] = [];

  public destroy$: Subject<boolean> = new Subject();
  public storage: NgxFileUploadStorage;
  public constructor(         
    private documentService:DocumentsService  
  ) {
    this.selectList = Object.keys(DocumentFor).map(key=>{return {key:key, value:DocumentFor[key]}});
    this.storage = new NgxFileUploadStorage({
      concurrentUploads: 4,
    });
  }

  ngOnInit(): void {
  }


}
