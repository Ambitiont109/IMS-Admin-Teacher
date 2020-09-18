import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { StudentService } from "../../../student.service";
import { Student } from '../../../student';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CONSTANTS } from "../../../constants";

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy  {
  students:Student[];
  private unsubscribeAll: Subject<any> = new Subject<any>();
  private studentSubScription:Subscription;
  public dashboardItems:{key:string, value:string}[];  
  public seriesData;
  public seriesName;
  public dashboardItem;

  constructor(private studentService:StudentService){
    this.students = new Array<Student>();
    this.dashboardItems = CONSTANTS.dashboardItems;
    this.dashboardItem = this.dashboardItems[0];
    this.studentSubScription =  this.studentService.students.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((students:Student[])=>{
      this.students = students;
      this.MakePieOptionFromName(this.dashboardItem);
    })
  }
  ngOnInit(): void {    
    // this.studentService.GetAllStudents();    
  }
  ngAfterViewInit(){

  }
  onSelectChange(itemKey){
    let item = this.dashboardItems.find(item=>{
      return item.key == itemKey
    })
    if(item){
      this.dashboardItem = item;
      this.MakePieOptionFromName(item);
    }
  }
  _GetKeyOfStudent(key){
    return key;
  }
  _GetNameOfStudent(value, dashboardItem){
    let preMadeNameList=[];
    let name = value;
    switch(dashboardItem.key){
      case 'typeOfHighSchool':
        if(value=='na')
          name='Did not attend high School'
        break;
      case 'isReceivedAid':
        if(value=='na')
          name='Did not attend high School'
        break;
      case 'isGraduated':
        preMadeNameList = CONSTANTS.valueListOfIsGrudated;
        break;
      case 'highschool_location':
        preMadeNameList = CONSTANTS.valueListOfLocaion
        break;
      case 'typeOfCollege':
        preMadeNameList = CONSTANTS.typeListOfCollege;
        break;
      case 'isReceivedScholarship':
        preMadeNameList = CONSTANTS.valueListOfScholarship;
        break;
      case 'isGraduatedCollege':
        preMadeNameList = CONSTANTS.valueListOfDegree;
        break;
      case 'locationOfCollege':
        preMadeNameList = CONSTANTS.valueListOfLocaion;
        break;
      case 'branchOfMilitary':
        preMadeNameList = CONSTANTS.valueListOfBranchMilitary;
        break;        
    }
    if(preMadeNameList.length >0){
      let findedItem = preMadeNameList.find((item)=>{
        return item.key == value;
      })
      name = findedItem.value;
    }      
    
    console.log(name);
    let uppercaseFirstLetter = name.charAt(0).toUpperCase();
    let stringWithoutFirstLetter = name.slice(1)
    name = uppercaseFirstLetter+stringWithoutFirstLetter    
    return name;
  }
  MakePieOptionFromName(dashboardItem:{key:string, value:string}){
    console.log(dashboardItem);
    let student=this.students[0];
    let seriesData={};
    let keyOfStudent = this._GetKeyOfStudent(dashboardItem.key);
    this.seriesName = dashboardItem.value;
    let preMadeNameList;
    this.students.forEach((student:Student)=>{      
      let value = student[keyOfStudent];
      if(!value)
        value="unknown"
      if(value in seriesData){
        seriesData[value].value ++;
      }else{
        seriesData[value]={value:1, name:this._GetNameOfStudent(value, dashboardItem)};
      }
    })
    console.log(seriesData);
    let keys = Object.keys(seriesData)
    let tmp_arr=[]
    keys.forEach((key)=>{
      tmp_arr.push(seriesData[key]);
    })
    this.seriesData = tmp_arr;
  }

  ngOnDestroy(){
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  
}
