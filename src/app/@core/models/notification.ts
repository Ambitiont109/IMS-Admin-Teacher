import { User } from './user';
export enum NotificationVerb{
    MessageCreate = 'message_create',
    UnreadMessage = 'there_is_unreadmessage',
    NoMessage = 'no_message'
}
export interface NotificationData{
    id:number,
    verb:string;
    subject:string;
    content:string;
    sender:User;    
}
export interface IMSNotification{
    id:number,
    data:NotificationData,
    receiver:number,
    is_read:boolean
}