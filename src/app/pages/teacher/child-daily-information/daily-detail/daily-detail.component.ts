import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChildService } from '../../../../@core/services/child.service';
import { switchMap } from 'rxjs/operators';
import { Child, ChildDailyInformation, InjureRecord } from '../../../../@core/models/child';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { isInvalidControl } from '../../../../@core/utils/form.util';
import { WeekNameList,DayNameListForMenu } from "../../../../@core/constants";
import * as moment from "moment";
import {  } from "module";
import { MustAfter } from '../../../../@core/utils/validators.util';
import { MenuItem } from '../../../../@core/models/meal-menu';
import { NbMenuService, NbToastrService } from '@nebular/theme';
import { MealMenuService } from '../../../../@core/services/meal-menu.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'ngx-daily-detail',
  templateUrl: './daily-detail.component.html',
  styleUrls: ['./daily-detail.component.scss']
})
export class DailyDetailComponent implements OnInit {

  childId:number;
  child:Child;
  childDailyInformation:ChildDailyInformation;
  formGroup:FormGroup;
  selectedMenu:MenuItem;
  allmenus:MenuItem[];
  weekNameList;
  dayNameList;
  constructor(
    private router:Router,
    private mealMenuService:MealMenuService,
    private childService:ChildService,
    private route:ActivatedRoute, 
    private toastrService:NbToastrService,
    private fb:FormBuilder
    ) { 
      this.weekNameList = WeekNameList;
      this.dayNameList = DayNameListForMenu
      this.formGroup = fb.group({
        ate:[0,Validators.nullValidator],
        ate_comment:['', Validators.nullValidator],
        week: [this.weekNameList[0].key, Validators.nullValidator],
        day: [this.dayNameList[0], Validators.nullValidator],
        comment:['', Validators.nullValidator],
        nap_start_time:[moment().toDate(),Validators.nullValidator],
        nap_end_time :[moment().toDate(), Validators.nullValidator],
        is_bowel_move:[false, Validators.nullValidator],
        bowel_movement_time:[1, Validators.nullValidator],
        injureForms:fb.array([1].map(x=>this.buildInjureForm(x))),
        injureComment:['', Validators.nullValidator],
      },{validators:[MustAfter('nap_start_time','nap_end_time')]})
    }

  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap(
      params => {
        this.childId = Number(params.get('childId'));
        return forkJoin(
          {
            data:this.childService.getChildDailyInformation(this.childId),
            allmenu: this.mealMenuService.getAllMenuInformation()
          }
        )
      }
    )).subscribe(({data,allmenu}:{data:ChildDailyInformation, allmenu:MenuItem[]}) => {
      this.child = data.child;    
      this.childDailyInformation = data;  
      this.allmenus = allmenu;
      this.findSelectedMenu();
      this.InitForm(data);
    })
  }
  InitForm(data:ChildDailyInformation){
    if(data){
      this.formGroup.reset(data);
      this.formGroup.get('week').setValue(data.menu.weekName);
      this.formGroup.get('day').setValue(data.menu.dayName);
      if(data.injures.length >0){
        this.formGroup.get('injureForms').setValue(data.injures.map((x:InjureRecord)=>{return this.buildInjureForm(x)}))    
        this.formGroup.get('injureComment').setValue(data.injures[0].comment);
      }  
    }
    
  }
  buildInjureForm(data?){
    let injureForm = this.fb.group({
      id:['',Validators.nullValidator],
      place:['', Validators.nullValidator],
      taken_time:['',Validators.nullValidator],
      comment:['', Validators.nullValidator]
    })
    if(data)
      injureForm.reset(data);
    return injureForm
  }

  IsBowelChange(data){

  }

  get isToddler():boolean{
    return this.childService.isChildToddler(this.child);
  }


  get IsBowelled():string{
    if(this.formGroup.get('is_bowel_move').value)
      return "Yes";
    return "No";
  }
  get IsBowelledBoolean():boolean{
    return !this.formGroup.get('is_bowel_move').value;
  }

  get injureForms():FormArray{
    return this.formGroup.get('injureForms') as FormArray;
  }

  addInjureForm(){
    this.injureForms.push(this.buildInjureForm())
  }
  removeInjureForm(index){
    this.injureForms.removeAt(index);
  }

  onMenuChange(data){    
    this.findSelectedMenu();
  }
  findSelectedMenu(){
    this.selectedMenu =  this.allmenus.find((x:MenuItem)=>{
      return x.dayName == this.formGroup.get('day').value && x.weekName == this.formGroup.get('week').value
    })
  }
  back(){
    this.router.navigate(['/teacher/childdailyinformation']);
  }
  onSubmit(){
    this.formGroup.markAllAsTouched();
    if(this.formGroup.valid){
      if(this.childDailyInformation){
        this.childDailyInformation = Object.assign(this.childDailyInformation, this.formGroup.value);
        this.childDailyInformation.menu = this.selectedMenu;
        this.childDailyInformation.injures = this.formGroup.get('injureForms').value;
        this.childService.updateChildDailyInformation(this.childDailyInformation).subscribe(_ =>{
          this._submitSuccess()
        });
      }else{
        this.childDailyInformation = Object.assign({}, this.formGroup.value);
        this.childDailyInformation.menu = this.selectedMenu;
        this.childDailyInformation.injures = this.formGroup.get('injureForms').value;
        this.childService.createChildDailyInformation(this.childDailyInformation).subscribe(_ => {
          this._submitSuccess();
        })
      }
    }
  }
  _submitSuccess(){
    this.toastrService.success("Updated Child Daily Information", "success");
  }
  isInvalidControl = isInvalidControl
}
