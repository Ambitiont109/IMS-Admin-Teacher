import { Component, OnInit } from '@angular/core';
import { YesNoDialogComponent } from '../../../../components/yes-no-dialog/yes-no-dialog.component';
import { NbDialogService } from '@nebular/theme';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isInvalidControl } from "../../../../@core/utils/form.util";
import {  MustAfter } from "../../../../@core/utils/validators.util";
import { PresetItem, PresetRecord, PresetStatus, TimeRangeItem } from "../../../../@core/models/appointment";
import { AppointmentService } from "../../../../@core/services/appointment.service";
import * as moment from "moment";
import { NameOfClass } from '../../../../@core/models/child';
import { ChildService } from '../../../../@core/services/child.service';
@Component({
  selector: 'ngx-preset',
  templateUrl: './preset.component.html',
  styleUrls: ['./preset.component.scss']
})
export class PresetComponent implements OnInit {
  isStarted:boolean;
  isFinished:boolean;
  isNewStarted:boolean;
  actionText:string;
  presetRecordForm:FormGroup;
  currentPresetRecord:PresetRecord

  constructor(
    private dialogService: NbDialogService,
    private childService:ChildService,
    private appointmentService: AppointmentService,
    private fb: FormBuilder ) {
    this.isStarted = false;
    this.isFinished = false;
    this.isNewStarted = false;
    this.actionText = "START";
   }
  
  ngOnInit(): void {
    this.presetRecordForm = this.fb.group({
      closeDateTime:['', Validators.required],
      presetItems:this.fb.array(this.childService.classNameList.map(classname=>this._buildPresetItemForm(classname)))
    })
    console.log(this.presetRecordForm);

    this.appointmentService.GetCurrentPresetRecord().subscribe((res:PresetRecord) => {
      console.log(res);
      this.currentPresetRecord = res;
      this.presetRecordForm.reset(res)
      if(res.status == PresetStatus.Started)
        this.isStarted = true;
      if(res.status == PresetStatus.Closed)
        this.isFinished = true;
      this._setActionText();
    })
    console.log(this.presetRecordForm);
  }
  onToogleChange($event:boolean){    
    this.isStarted = $event;
    if($event == true){
      this.onSubmit();
      if(this.presetRecordForm.invalid){        
        setTimeout(_=>{this.isStarted = false}, 100);
      }        
    }
    if($event==false){
      this.dialogService.open(YesNoDialogComponent,{context:{
        title:'Are you going to close?'
      }}).onClose.subscribe(ret=>{
        if(ret==false){         
          this.isStarted = true;
          this.actionText = "CLOSE";
        }else{
          this.appointmentService.CloseCurrentPreset(this.currentPresetRecord.id).subscribe(_=>{
            this.isFinished = true;  
          })
          
        }
      })
    }
    this._setActionText();
  }
  _buildPresetItemForm(classroom:NameOfClass, data?:PresetItem):FormGroup{
    let formGroup:FormGroup =  this.fb.group({
      classroom:[classroom],
      timeranges:this.fb.array([1,1,1].map(item=>this._buildTimeRangeForm()),Validators.minLength(3)),
      duration:[20,Validators.required]
    })
    if(data)
      formGroup.reset(data);
    return formGroup;
  }
  _buildTimeRangeForm(data?:TimeRangeItem){
    let formGroup:FormGroup =  this.fb.group({
      startTime:['', Validators.required],
      endTime:['', Validators.required],
      date:['',Validators.required]
    }, {validators:[MustAfter('startTime','endTime')]})
    if(data)
      formGroup.reset(data);
    return formGroup
  }
  get presetItemForms():FormArray{
    return this.presetRecordForm.get('presetItems') as FormArray;
  }
  _setActionText(){
    if(this.isStarted == true)
      this.actionText = "CLOSE";
    else
      this.actionText = "START";
  }
  updateSubmit(){

  }
  onSubmit(){
    this.presetRecordForm.markAllAsTouched();
    if(this.presetRecordForm.valid){
      let presetInfo:PresetRecord = Object.assign({}, this.presetRecordForm.value);
      this.appointmentService.StartNewPreset(presetInfo).subscribe(_=>{});
    }
  }
  addTimeRangeForm(presetItemForm:FormGroup){
    (presetItemForm.get('timeranges') as FormArray) .push(this._buildTimeRangeForm());
  }
  removeTimeRangeForm(presetItemForm, index){
    this.dialogService.open(YesNoDialogComponent,{context:{
      title:'Are you sure?'
    }}).onClose.subscribe(ret=>{
      if(ret==true){         
        (presetItemForm.get('timeranges') as FormArray).removeAt(index);
      }
    })    
  }
  startNew(){
    this.isNewStarted = true;
    this.isFinished = false;
    this.isStarted = false;
  }
  isInvalidControl = isInvalidControl;
}
