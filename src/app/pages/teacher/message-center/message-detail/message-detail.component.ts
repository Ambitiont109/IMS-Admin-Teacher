import { Component, OnInit } from '@angular/core';
import { Message } from "../../../../@core/models/message";
import { User,USERROLE } from "../../../../@core/models/user";
import { MessageService } from "../../../../@core/services/message.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Location} from '@angular/common';
import * as moment from 'moment';
import { switchMap } from 'rxjs/operators';
import { UsersService } from '../../../../@core/services/users.service';

@Component({
  selector: 'ngx-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit {
  public msgId:number;
  public messages:Message[];
  public isReplyMode:boolean;
  public user:User;
  constructor(private messageSerivce:MessageService,
              private usersService:UsersService,
              private route:ActivatedRoute,
              private router:Router,
              private _location:Location
    ) {

    }


  ngOnInit(): void {
    this.usersService.getCurrentUser().subscribe(user=>{this.user = user;})
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
  resolveSenderEmail(msg:Message):string{
    let user = msg.sender;
    if(user.id == this.user.id)
      return "me";
    if(user.role == USERROLE.Admin)
      return "Admin Center";
    if(user.role == USERROLE.Parent)
      return msg.child.first_name + " " + msg.child.last_name;
    return user.first_name + " "+ user.last_name;
  }

  resolveReceiverEmail(msg:Message):string{
    let user = msg.receiver;    
    if(user.id == this.user.id)
      return "me";
    if(user.role == USERROLE.Admin)
      return "Admin Center";
    if(user.role == USERROLE.Parent)
      return msg.child.first_name + " " + msg.child.last_name;
    return user.first_name + " "+ user.last_name;
  }

  resolveReceiverPictureUrl(msg:Message):string{
    if(msg.receiver.role == USERROLE.Parent)
      return msg.child.photo
    return msg.sender.picture;
  }
  resolveSenderPictureUrl(msg:Message):string{
    if(msg.sender.role == USERROLE.Parent)
      return msg.child.photo
    return msg.sender.picture;
  }
}
