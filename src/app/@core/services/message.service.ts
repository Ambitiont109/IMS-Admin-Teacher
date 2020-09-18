import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { messages, deepMessages } from "../dummy";
import { Observable, of } from 'rxjs';
import { Message } from '../models/message';
import { User, USERROLE } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  
  getAdminHeaderMessage():Observable<Message[]>{
    return of(messages);
  }
  getMessagesByUser(user:User):Observable<Message[]>{
    return of(messages);
  }
  getMessageLinked(msgId:number):Observable<Message[]>{
    return of(deepMessages);
  }
  sendMessage(from:User, to:User[], messageData){
    
  }



  getSenderName(msg:Message){
    switch(msg.sender.role){
      case USERROLE.Admin:
        return 'Admin Center';
      case USERROLE.Parent:
        return msg.child.first_name + " " + msg.child.last_name;
      case USERROLE.Teacher:
        return msg.sender.first_name + " " + msg.sender.last_name;
    }
  }
  getReceiverName(msg:Message){
    switch(msg.receiver.role){
      case USERROLE.Admin:
        return 'Admin Center';
      case USERROLE.Parent:
        return msg.child.first_name + " " + msg.child.last_name;
      case USERROLE.Teacher:
        return msg.receiver.first_name + " " + msg.receiver.last_name;
    }
  }
  getSenderPhotoUrl(msg:Message){
    if(msg.sender.role == USERROLE.Parent)  return msg.child.photo
    else return msg.sender.picture
  }
  getReceiverPhotoUrl(msg:Message){
    if(msg.receiver.role == USERROLE.Parent)  return msg.child.photo
    else return msg.receiver.picture
  }
}
