import { Component, OnInit } from '@angular/core';
import { Message } from "../../../../@core/models/message";
import { User,USERROLE } from "../../../../@core/models/user";
import { MessageService } from "../../../../@core/services/message.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Location} from '@angular/common';
import * as moment from 'moment';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit {
  public msgId:number;
  public messages:Message[];
  public isReplyMode:boolean;

  constructor(private messageSerivce:MessageService,
              private route:ActivatedRoute,
              private router:Router,
              private _location:Location
    ) {

    }


  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap(
      params => {
        this.msgId = Number(params.get('id'));
        return this.messageSerivce.getMessageLinked(this.msgId);
      }
    )).subscribe((msgs)=>{      
      this.messages = msgs;
    })
    this.isReplyMode = false
  }

  isUserAdmin(user:User):boolean{
    return user.role == USERROLE.Admin
  }

  getFormatDate(date:string){
    let md = moment(date);
    if(md.isValid)
      return md.format('LT');
    return '';
  }
  goToMessageCenter(){
    this._location.back()
  }
  getSenderName = this.messageSerivce.getSenderName;
  getReceiverName = this.messageSerivce.getReceiverName;
  getSenderPhotoUrl = this.messageSerivce.getSenderPhotoUrl;
  getReceiverPhotoUrl = this.messageSerivce.getReceiverPhotoUrl;
}
