import { Component, OnInit } from '@angular/core';
import { Message } from "../../../@core/models/message";
import { User,USERROLE } from "../../../@core/models/user";
import { MessageService } from "../../../@core/services/message.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { UsersService } from '../../../@core/services/users.service';
@Component({
  selector: 'ngx-message-center',
  templateUrl: './message-center.component.html',
  styleUrls: ['./message-center.component.scss']
})
export class MessageCenterComponent implements OnInit {

  public messages:Message[];
  public user:User;
  constructor(private messageSerivce:MessageService,
              private route:ActivatedRoute,
              private userService:UsersService,
              private router:Router,
    ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user:User)=>{
      this.user = user;
      this.messageSerivce.getMessagesByUser(this.user).subscribe((msgs)=>{      
        this.messages = msgs;
        this.messages.sort((a:Message,b:Message)=>{
          let ma = moment(a.created_at);
          let mb = moment(b.created_at);
          if(ma.isAfter(mb)) return 1;
          return 0;
        })
      })
    })
  }
  isUserAdmin(user:User):boolean{
    return user.role == USERROLE.Admin
  }
  resolveUserEmail(user:User):string{
    if(user.id == this.user.id)
      return "me";
    if(user.role == USERROLE.Admin)
      return "Admin Center";
    return user.email;

  }
  getFormatDate(date:string){
    let md = moment(date);
    if(md.isValid)
      return md.format('LT');
    return '';
  }
  goToMessageDetail(msg:Message){
    this.router.navigate([msg.id],{relativeTo:this.route})
  }
}
