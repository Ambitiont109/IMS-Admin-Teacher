import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { NgxFileUploadStorage, NgxFileUploadFactory, NgxFileUploadOptions, NgxFileUploadRequest } from "@ngx-file-upload/core";
import { of, Observable } from "rxjs";
import { UsersService } from "../../../@core/services/users.service";
import { User, USERROLE } from "../../../@core/models/user";
import { UserService } from '../../../@core/mock/users.service';
import { TagInputItem } from '../tag-input/tag-input.component';
export interface ReplyData{
  to_contacts:TagInputItem[],
  content:any,
  isAttached:boolean

}
@Component({
  selector: 'ngx-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
  @Input() isReplyMode:boolean;
  @Input() fromContact:User;
  @Output('onsend') onSendEvent = new EventEmitter();
  public fromString:string;
  public to_contacts:TagInputItem[];
  public content;
  public uploads: NgxFileUploadRequest[] = [];

  public storage: NgxFileUploadStorage;

  private uploadOptions: NgxFileUploadOptions;
  public isAttached:boolean;
  public items:[];
  public users:User[];
  constructor( @Inject(NgxFileUploadFactory) private uploadFactory: NgxFileUploadFactory,
              private userService:UsersService) {
    this.storage = new NgxFileUploadStorage({
      concurrentUploads: 2,
      autoStart: true,
      removeCompleted: 1000 // remove completed after 5 seconds
    });
    this.uploadOptions = {url: "http://localhost:3000/upload"};
    this.isReplyMode = false;
  }
  
  

  ngOnInit(): void {    
    this.isAttached = false;
    this.storage.change()
    .subscribe(uploads => {
      this.uploads = uploads
    });
    
    this.userService.getParents().subscribe((users:User[])=>{
      this.users = users;
    })
    this.fromString = this.getFromString();
  }
  getFromString(){
    if(this.fromContact.role == USERROLE.Admin)
      return "Admin Center"
    if(this.fromContact.role == USERROLE.Teacher)
      return this.fromContact.first_name + " " + this.fromContact.last_name;
  }
  public send(){
    let data:ReplyData = {
      to_contacts:this.to_contacts,
      content:this.content,
      isAttached:this.isAttached
    }
    this.onSendEvent.emit(data)
  }
}
