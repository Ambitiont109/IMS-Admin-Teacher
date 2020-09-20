import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { YesNoDialogComponent } from '../../../../components/yes-no-dialog/yes-no-dialog.component';
import { NbDialogService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isInvalidControl } from "../../../../@core/utils/form.util";
import { PresetAppointment, PresetItem, PresetRecord, PresetType, TimeRangeItem } from "../../../../@core/models/appointment";
import { AppointmentService } from "../../../../@core/services/appointment.service";
import { UsersService } from "../../../../@core/services/users.service";
import { User, USERROLE } from "../../../../@core/models/user";
import { Appointment, AppointmentType } from "../../../../@core/models/appointment";
import { switchMap } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import * as moment from "moment";
import { forkJoin } from 'rxjs';
import { ChildService } from '../../../../@core/services/child.service';
import { Child, NameOfClass } from '../../../../@core/models/child';
import { children } from '../../../../@core/dummy';
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
  appoinment:PresetAppointment;
  apnts:PresetAppointment[];
  
  ToddlerType:PresetType = PresetType.Toddler;
  KindergartenType:PresetType = PresetType.Kindergarten;
  currentPresetRecord:PresetRecord;

  childs:Child[];
  classNameList:NameOfClass[];
  dates:TimeRangeItem[];
  selectedClassroom:NameOfClass;
  selectedParent:User;
  selectedChild:Child;
  slotsInfo:any;
  selectedTimeRange: TimeRangeItem;
  
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
    
  }

  ngOnInit(): void {
    this.appointmentService.GetCurrentPresetRecord().subscribe(res=>{this.currentPresetRecord = res;})
    this.classNameList = this.childService.classNameList;
    this.selectedClassroom = this.childService.getCurrentClassName();
    
    if(this.isEditmode){
      this.route.paramMap.pipe(
        switchMap(
          params => {
            this.appointmentId = Number(params.get('appointment_id'));
            this.selectedClassroom = params.get('classroom') as NameOfClass;
            return forkJoin({
              currentPreset:this.appointmentService.GetCurrentPresetRecord(),
              children: this.childService.getAllChildren(),
              presetAppointments:this.appointmentService.GetPresetAppointmentByClassroom(this.selectedClassroom)
            });
            
          }
        )
      ).subscribe((ret)=>{
        this.currentPresetRecord = ret.currentPreset;
        this.appoinment = ret.presetAppointments.find((item)=>{return item.id == this.appointmentId})
        if(this.appoinment){          
          this.selectedTimeRange = this.appoinment.timerange;
          this.apnts = ret.presetAppointments;
          this.GenerateSlotsInfo(ret.presetAppointments)
        }
        
      })
    }
    else{
      forkJoin({
        currentPreset:this.appointmentService.GetCurrentPresetRecord(),
        presetAppointments:this.appointmentService.GetPresetAppointmentByClassroom(this.selectedClassroom),
        children: this.childService.getAllChildren()
      }).subscribe( res => {        
        this.currentPresetRecord = res.currentPreset;
        this.dates = this.currentPresetRecord.presetItems.find((item:PresetItem)=>{
          return (item.classroom == this.selectedClassroom)
        }).timeranges;
        this.selectedTimeRange = this.dates[0];
        this.childs = res.children;
        this.apnts = res.presetAppointments;
        this.GenerateSlotsInfo(this.apnts);
        
      })
    }    
  }
  _generateslotsInfo(appnts:PresetAppointment[], classroom:NameOfClass){
    let retSlotData={}
    let presetItem:PresetItem = this.currentPresetRecord.presetItems.find((item:PresetItem)=>{return item.classroom == classroom});
    let duration = presetItem.duration;
    if(!presetItem) return {};
    presetItem.timeranges.forEach((item:TimeRangeItem)=>{
      retSlotData[item.id] = [];
      let startTime = moment(item.startTime);
      let endTime = moment(item.endTime);
      for(let j = startTime.clone(); j.isBefore(endTime,'minutes');j.add(duration,'minutes')){
        //Check if J time slot is booked or not.
        let findedItem = appnts.find((item:PresetAppointment)=>{
          let start = moment(item.start);
          let end = moment(item.end)
          return (j.isSame(start,'minutes') && j.clone().add(duration,'minutes').isSame(end))
        })
        let data:SlotInfo={
          start: j.toDate(),
          end: j.clone().add(duration,'minutes').toDate(),
          booked: false,
        }
        
        if(findedItem){
          data.booked = true;
        }
        retSlotData[item.id].push(data);
      }
    })
    return retSlotData;
  }
  GenerateSlotsInfo(appnts:PresetAppointment[]){   
    this.slotsInfo = this._generateslotsInfo(appnts,this.selectedClassroom)
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
          this.appoinment.start = moment(this.selectedTimeRange.date).hour(start.hour()).minute(start.minute()).toDate();
          this.appoinment.end = moment(this.selectedTimeRange.date).hour(end.hour()).minute(end.minute()).toDate();
          this.appointmentService.updatePresetAppointment(this.appoinment).subscribe(_=>{
            this.toastrService.success('Updated the Appointment',"Success");
          })
        }else{
          this.appoinment = this.appointmentService.createBlankPresetAppointment();          
          // this.appoinment.title = `${this.selectedTeacher.first_name} ${this.selectedTeacher.last_name} & ${this.selectedParent.first_name, this.selectedParent.last_name} (PRESET)`;
          this.appoinment.child = this.selectedChild;
          this.appoinment.className = this.selectedClassroom;
          this.appoinment.presetInfo = this.currentPresetRecord.id;
          this.appoinment.start = moment(this.selectedTimeRange.date).hour(start.hour()).minute(start.minute()).toDate();
          this.appoinment.end = moment(this.selectedTimeRange.date).hour(end.hour()).minute(end.minute()).toDate();

          this.appointmentService.createPresetAppointment(this.appoinment).subscribe(_ => {
            this.toastrService.success('Registered the New Preset Appointment',"Success");
          })
        }
      }
    })
  }


  onChildChange(data:Child){
    
  }
  onClassroomChange(name:NameOfClass){
    let findedItem:PresetItem =  this.currentPresetRecord.presetItems.find(item=>{return (item.classroom == name)});
    
    if(findedItem){
      this.appointmentService.GetPresetAppointmentByClassroom(name).subscribe(apnts=>{
        this.dates = findedItem.timeranges;
        this.selectedTimeRange = this.dates[0];
        this.GenerateSlotsInfo(this.apnts);
      })
      
    }else this.dates=[]
    
  }
  onTimerangeChange(data:TimeRangeItem){
  }


  get title():string{
    if(this.isEditmode)
      return "Edit Preset Appointment"
    return "Create Preset Appointment"
  }
  get slots():SlotInfo[]{
    return this.slotsInfo[this.selectedTimeRange.id];
  }
}
