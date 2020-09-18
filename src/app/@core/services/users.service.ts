import { Injectable } from '@angular/core';
import { User, USERROLE } from "../models/user";
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable, of, BehaviorSubject } from 'rxjs';
import { user as dummy_user, users as dummyUsers, user, users } from "../dummy";

export const unknown_picture="/assets/images/blank-profile.png";
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  api_url = environment.API_URL;  
  public current_user: User;
  constructor(private httpClient:HttpClient) { 
  }
  setDummyCurrentUser(type){
    if(type == 'teacher')
      this.current_user = users[1];
    if(type =='admin')
      this.current_user = users[0];

  }
  AddUser(user:User):Observable<any>{
    dummyUsers.push(user);
    return of('')
  }
  getCurrentUser():Observable<User>{
    if (this.current_user){
      return of(this.current_user)
    } else{
      this.current_user = dummy_user;
      return of(this.current_user);
    }
  }
  getParents():Observable<User[]>{
    let ret_user = dummyUsers.filter((user:User)=>{
      return user.role == USERROLE.Parent;
    });
    return of(ret_user);
  }
  getTeachers():Observable<User[]>{
    let ret_user = dummyUsers.filter((user:User)=>{
      return user.role == USERROLE.Teacher;
    });
    return of(ret_user);
  }
  getAdmins():Observable<User[]> {
    let ret_user = dummyUsers.filter((user:User)=>{
      return user.role == USERROLE.Admin;
    });
    return of(ret_user);
  }
  getAllUsers():Observable<User[]>{
    return of(dummyUsers)
  }
  updateUser(user:User):Observable<any>{
    return of('');
  }
  deleteUser(userId:number):Observable<any> {
    return of('')
  }
  getUserById(id:number):Observable<User>{
    let findeduser = users.find((user:User) =>{
      return user.id == id
    })
    return of(findeduser);
  }
}
