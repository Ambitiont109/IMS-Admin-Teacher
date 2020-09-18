import { Injectable } from '@angular/core';
import { Child, NameOfClass, ChildDailyInformation } from "../models/child";
import { environment } from "../../../environments/environment";
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { children, childDailyInformations } from "../dummy";
import { find } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChildService {
  api_url = environment.API_URL;
  private current_class_name: NameOfClass;
  public currentClassNameSubject:BehaviorSubject<NameOfClass>;
  constructor() {
    this.currentClassNameSubject = new BehaviorSubject<NameOfClass>(undefined);
   }
  get classNameList():any[]{
    return Object.keys(NameOfClass).map( item => NameOfClass[item]);
  }
  isChildToddler(child:Child):boolean{
    if (child.nameOfClass == NameOfClass.Bamboo || child.nameOfClass == NameOfClass.Iroko)
      return true;
    return false;
  }
  getChildrenByClassName(className:NameOfClass):Observable<Child[]>{
    let ret = children.filter((item:Child)=>{
      return (item.nameOfClass == className)
    })
    return of(ret)
  }
  getAllChildren():Observable<Child[]>{
    return of(children)
  }
  getChildsOfTeacher(teacher:User):Observable<any>{    
    return of(children);
  }
  getChildById(childId:number):Observable<Child>{
    return of(children[childId]);
  }
  createChildDailyInformation(childDailyInformation:ChildDailyInformation):Observable<any>{
    childDailyInformations.push(childDailyInformation);
    return of('')
  }
  updateChildDailyInformation(childDailyInformation:ChildDailyInformation):Observable<any>{
    let findedItem:ChildDailyInformation =  childDailyInformations.find((x:ChildDailyInformation)=>{
      return x.id == childDailyInformation.id
    });
    findedItem = Object.assign(findedItem, childDailyInformation);
    return of('')
  }
  getChildDailyInformation(childId:number):Observable<ChildDailyInformation>{
    return of(childDailyInformations[childId-1]);
  }

  getCurrentClassName(){
    if(this.current_class_name == undefined)
      this.current_class_name = localStorage.getItem('class_name') as NameOfClass;
    return this.current_class_name
  }

  setCurrentClassName(name: NameOfClass){
    this.current_class_name = name;
    localStorage.setItem('class_name', this.current_class_name);
    this.currentClassNameSubject.next(this.current_class_name);
  }


}
