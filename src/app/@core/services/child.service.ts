import { Injectable } from '@angular/core';
import { Child, NameOfClass, ChildDailyInformation, SiblingChild } from "../models/child";
import { environment } from "../../../environments/environment";
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { children, childDailyInformations } from "../dummy";
import { find } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChildService {
  api_url = environment.API_URL;
  private current_class_name: NameOfClass;
  public currentClassNameSubject:BehaviorSubject<NameOfClass>;
  constructor(private httpClient:HttpClient) {
    this.currentClassNameSubject = new BehaviorSubject<NameOfClass>(undefined);
   }
  get classNameList():any[]{
    return Object.keys(NameOfClass).map( item => NameOfClass[item]);
  }

  addNewChild(child:Child):Observable<any>{
    return of('')

  }
  isChildToddler(child:Child):boolean{
    if (child.nameOfClass == NameOfClass.Bamboo || child.nameOfClass == NameOfClass.Iroko)
      return true;
    return false;
  }
  getChildrenByClassName(className:NameOfClass):Observable<Child[]>{
    return this.httpClient.get<Child[]>(`${this.api_url}/child?nameOfClass=${className}`);
  }
  getAllChildren():Observable<Child[]>{ // Return All Children without considering current Classroom
    return this.httpClient.get<Child[]>(`${this.api_url}/child/`);
  }
  getChildsOfTeacher(teacher:User):Observable<any>{    
    return of(children);
  }
  getChildById(childId:number):Observable<Child>{    
    return this.httpClient.get<Child>(`${this.api_url}/child/${childId}/`);
    // return of(children[childId-1]);
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

  AddSiblings(pchild:Child, siblings:Child[]):Observable<any>{
    siblings.forEach(child=>{ 
      let item:SiblingChild = {
        id:child.id, first_name:child.first_name, last_name:child.last_name, parent:child.parent.id, photo:child.photo
      }
      console.log(item);
      pchild.siblings.push(item);
    })
    return of('');
  }
  RemoveChildFromSibling(child:Child):Observable<any>{  // Have to change sibling Id to the blank sibling id.
    child.siblings =[];
    return of('')
  }
}
