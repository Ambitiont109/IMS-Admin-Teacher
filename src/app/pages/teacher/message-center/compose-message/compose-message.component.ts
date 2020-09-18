import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../@core/services/users.service';
import { User } from '../../../../@core/models/user';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from '../../../../@core/services/message.service';
import { ReplyData } from '../../../../shared/components/reply/reply.component';

@Component({
  selector: 'ngx-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.scss']
})
export class ComposeMessageComponent implements OnInit {
  public currentUser:User;
  public from_string:string;
  constructor(private userService:UsersService, private mssageService:MessageService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user:User)=>{
      this.currentUser = user;
      this.from_string = this.currentUser.email;      
    })
  }
  onSend(data:ReplyData){
    // this.mssageService.sendMessage(this.user, data.to_contacts,data.content);
  }
}
