import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { YesNoDialogComponent } from '../../../../components/yes-no-dialog/yes-no-dialog.component';
import { NbDialogService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isInvalidControl } from "../../../../@core/utils/form.util";
import { PresetRecord, PresetType } from "../../../../@core/models/appointment";
import { AppointmentService } from "../../../../@core/services/appointment.service";
import { UsersService } from "../../../../@core/services/users.service";
import { User, USERROLE } from "../../../../@core/models/user";
import { Appointment, AppointmentType } from "../../../../@core/models/appointment";
import { switchMap } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import * as moment from "moment";
import { forkJoin } from 'rxjs';
import { ChildService } from '../../../../@core/services/child.service';
import { NameOfClass } from '../../../../@core/models/child';
interface SlotInfo{
  start: Date,
  end: Date
  booked: boolean,  
}

@Component({
  selector: 'ngx-appointment-preset-edit',
  templateUrl: './appointment-preset-edit.component.html',
  styleUrls: ['./appointment-preset-edit.component.scss']
})
export class AppointmentPresetEditComponent implements OnInit {
  @Input('editmode') isEditmode:boolean;
  appointmentId:number;
  appoinment:Appointment;
  ToddlerType:PresetType = PresetType.Toddler;
  KindergartenType:PresetType = PresetType.Kindergarten;
  currentPresetRecord:PresetRecord;
  parents:User[];
  teachers:User[];
  classNameList:NameOfClass[];
  selectedClassroom:NameOfClass;
  selectedParent:User;
  slotsInfo:any;
  selectedDate: Date;
  selectedPresetType:PresetType;
  min:Date;
  max:Date;
  isParentTeacherSelected:boolean;
  
  constructor(
    private route:ActivatedRoute,
    private childService:ChildService,
    private appointmentService:AppointmentService,
    private dialogService: NbDialogService,
    private toastrService:NbToastrService,
    private router:Router,
    private userService:UsersService


    ) { 
    this.isEditmode = true;
    this.selectedDate = moment().toDate();
    this.min = moment().toDate();
    this.max = moment().toDate();
    this.selectedPresetType = PresetType.Toddler;
    this.isParentTeacherSelected = false;
    
  }

  ngOnInit(): void {
    this.appointmentService.GetCurrentPresetRecord().subscribe(res=>{this.currentPresetRecord = res;})
    this.classNameList = this.childService.classNameList;
    if(this.isEditmode){
      this.route.paramMap.pipe(
        switchMap(
          params => {
            this.appointmentId = Number(params.get('appointment_id'));
            return forkJoin({
              currentPreset:this.appointmentService.GetCurrentPresetRecord(),
              presetAppointments:this.appointmentService.GetPresetAppointmentsFromAppointment(this.appointmentId)
            });
            
          }
        )
      ).subscribe(({currentPreset,presetAppointments}:{currentPreset:PresetRecord,presetAppointments:Appointment[]})=>{
        console.log(presetAppointments);
        this.currentPresetRecord = currentPreset;
        console.log(this.currentPresetRecord);
        this.appoinment = presetAppointments.find((item)=>{return item.id == this.appointmentId})
        console.log(this.appoinment);
        if(this.appoinment){          
          this.selectedDate = this.appoinment.start;
          this.selectedPresetType = this.appoinment.presetType;
          // this.selectedTeacher = this.appoinment.teacher;
          this.selectedParent = this.appoinment.parent;
          this.isParentTeacherSelected = true;

          this.GenerateSlotsInfo(presetAppointments)
        }
        
      })
    }
    else{
      forkJoin({
        currentPreset:this.appointmentService.GetCurrentPresetRecord(),
        users: this.userService.getAllUsers()
      }).subscribe( res => {
        this.currentPresetRecord = res.currentPreset;

        let users = res.users;
        this.teachers=[];
        this.parents=[]
        users.forEach((user:User)=>{
          if(user.role == USERROLE.Teacher){
            this.teachers.push(user)
          }
          if(user.role == USERROLE.Parent){
            this.parents.push(user)
          }
        })
      })
    }    
  }
  _generateslotsInfo(appnts:Appointment[], presetType:PresetType){
    let retSlotData={}
    let startDay, endDay, startTime:moment.Moment, endTime:moment.Moment, duration;
    // startDay =moment(this.currentPresetRecord[presetType].selectedMoments[0]).dayOfYear();
    // endDay = moment(this.currentPresetRecord[presetType].selectedMoments[1]).dayOfYear();
    // startTime = moment(this.currentPresetRecord[presetType].start);
    // endTime = moment(this.currentPresetRecord[presetType].end);
    duration = this.currentPresetRecord[presetType].duration;
    for(let i = startDay; i<=endDay; i ++){
      retSlotData[i] = [];
      for(let j = startTime.clone(); j.isBefore(endTime,'minutes') && j.isSame(endTime,'year');j.add(duration,'minutes')){
        //Check if J time slot is booked or not.
        let findedItem = appnts.find((item:Appointment)=>{
          let start = moment(item.start);
          return (start.dayOfYear() == i && start.isSame(j,'hour') && start.isSame(j,'minute') && item.presetType == presetType)
        })
        let data:SlotInfo={
          start: j.toDate(),
          end: j.clone().add(duration,'minutes').toDate(),
          booked: false,
        }
        retSlotData[i].push(data);
        if(findedItem){
          retSlotData[i].booked = true;
        }
      }
    }
    return retSlotData;
  }
  GenerateSlotsInfo(appnts:Appointment[]){
    this.slotsInfo = {};
    this.slotsInfo[this.KindergartenType]=this._generateslotsInfo(appnts, this.KindergartenType);
    this.slotsInfo[this.ToddlerType]=this._generateslotsInfo(appnts, this.ToddlerType);    
  }
  back(){

  }
  onConfirm($event){
    let start:moment.Moment = moment($event.start);
    let end:moment.Moment = moment($event.end);
    this.dialogService.open(YesNoDialogComponent,{context:{
      title:'Are you sure?'
    }}).onClose.subscribe(ret=>{
      if(ret==true){
        
        if(this.isEditmode){
          this.appoinment.presetType = this.selectedPresetType;
          this.appoinment.start = moment(this.selectedDate).hour(start.hour()).minute(start.minute()).toDate();
          this.appoinment.end = moment(this.selectedDate).hour(end.hour()).minute(end.minute()).toDate();
          this.appointmentService.UpdateEventById(this.appoinment).subscribe(_=>{
            this.toastrService.success('Updated the Appointment',"Success");
            this.router.navigate([`/appointment/${this.appoinment.parent.id}`]);
          })
        }else{
          this.appoinment = this.appointmentService.createBlankAppointment();          
          // this.appoinment.title = `${this.selectedTeacher.first_name} ${this.selectedTeacher.last_name} & ${this.selectedParent.first_name, this.selectedParent.last_name} (PRESET)`;
          this.appoinment.type = AppointmentType.PRESET;
          this.appoinment.presetType = this.selectedPresetType;
          this.appoinment.start = moment(this.selectedDate).hour(start.hour()).minute(start.minute()).toDate();
          this.appoinment.end = moment(this.selectedDate).hour(end.hour()).minute(end.minute()).toDate();

          this.appointmentService.CreateEvent(this.appoinment).subscribe(_ => {
            this.toastrService.success('Registered the New Appointment',"Success");
            this.router.navigate([`/appointment/${this.appoinment.parent.id}`]);
          })
        }
      }
    })
  }
  onPresetTypeChange($event){    
    this.selectedPresetType = $event;    
    console.log(this.currentPresetRecord)
    // this.min = this.currentPresetRecord[this.selectedPresetType].selectedMoments[0];
    // this.max = this.currentPresetRecord[this.selectedPresetType].selectedMoments[1];
    
  }
  onTeacherChange(data:User){
    this._setIsParentTeacherSelected()
    if(this.isParentTeacherSelected){
      // this.appointmentService.GetPresetAppointmentsByUserIdList([this.selectedParent.id, this.selectedTeacher.id]).subscribe((apnts:Appointment[])=>{
      //   this.GenerateSlotsInfo(apnts);
      // })
    }
    
  }
  onParentChange(data:User){
    this._setIsParentTeacherSelected()
    if(this.isParentTeacherSelected){
      // this.appointmentService.GetPresetAppointmentsByUserIdList([this.selectedParent.id, this.selectedTeacher.id]).subscribe((apnts:Appointment[])=>{
      //   this.GenerateSlotsInfo(apnts);
      // })
    }
  }
  _setIsParentTeacherSelected(){
    // if(this.selectedTeacher && this.selectedParent)
    //   this.isParentTeacherSelected = true;
    // else
    //   this.isParentTeacherSelected = false;
  }
  get title():string{
    if(this.isEditmode)
      return "Edit Preset Appointment"
    return "Create Preset Appointment"
  }
  get slots():SlotInfo[]{
    return this.slotsInfo[this.selectedPresetType][moment(this.selectedDate).dayOfYear()]
  }
}
