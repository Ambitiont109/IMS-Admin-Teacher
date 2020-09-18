import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../@core/services/users.service';
import { User } from '../../../../@core/models/user';
import { TagInputItem } from '../../../../shared/components/tag-input/tag-input.component';
import { MessageService } from '../../../../@core/services/message.service';
import { ReplyData } from '../../../../shared/components/reply/reply.component';

@Component({
  selector: 'ngx-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.scss']
})
export class ComposeMessageComponent implements OnInit {
  currentUser:User;
  constructor(
    private userService:UsersService,
    private messageSerivce:MessageService
    ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user:User)=>{
      this.currentUser = user;
    })
  }
  onSend(data:ReplyData){
    alert(data.content)
    //this.messageSerivce.sendMessage()
  }

}
