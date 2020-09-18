import { Component, OnInit } from '@angular/core';
import { DocumentsService } from "../../../@core/services/documents.service";
import { documents } from '../../../@core/dummy';
import { Document, DocumentFor } from '../../../@core/models/document';
@Component({
  selector: 'ngx-school-documents',
  templateUrl: './school-documents.component.html',
  styleUrls: ['./school-documents.component.scss']
})
export class SchoolDocumentsComponent implements OnInit {

  public documents:any[];
  public isAdd:boolean = false;

  constructor(private documentService:DocumentsService) { }

  ngOnInit(): void {
    this.documentService.getDocuments().subscribe(documents=>{
      this.documents = documents;
    })
  }
  get forClassroomDocuments(){
    return this.documents.filter((item:Document) => {
      return item.for == DocumentFor.Classroom
    })
  }
  get forAllDocuments(){
    return this.documents.filter((item:Document) => {
      return item.for == DocumentFor.All
    })
  }

}
