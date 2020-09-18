import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable, of, BehaviorSubject } from 'rxjs';
import { events, appointmentsOfOneUser,presetInfos } from "../dummy";
import { Appointment, colors, COLOR, AppointmentType, PresetRecord, AppointmentStatus, PresetStatus } from "../models/appointment";
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  api_url = environment.API_URL;

  constructor() { }
  createBlankAppointment():Appointment{
    return {
      id:-1,
      title:'',
      color:COLOR.Red,
      parent:undefined,
      teacher:undefined,
      start:undefined,
      end:undefined,
      status:AppointmentStatus.PENDING,
      child:undefined,
      type:AppointmentType.FREE

    }
  }
  getEventsByUserId(userId):Observable<Appointment[]>{
    return of(appointmentsOfOneUser);
  }
  getEventsOfCurrentUser():Observable<Appointment[]>{
    return of(appointmentsOfOneUser);
  }
  patchEvent(apnt:Appointment, patch):Observable<any>{
    Object.assign(apnt,patch);
    return of('')
  }
  getEventById(eventId):Observable<Appointment>{
    return of(appointmentsOfOneUser[eventId]);
  }
  deleteEventById(eventId):Observable<any>{
    appointmentsOfOneUser.splice(eventId,1);
    return of("success");
  }
  
  
  StartNewPreset(presetRecord:PresetRecord):Observable<any>{
    presetRecord.id = presetInfos.length;
    presetRecord.status = PresetStatus.Started;
    presetInfos.push(presetRecord);
    return of('success');
  }
  UpdatePresetRecord(presetRecord:PresetRecord):Observable<any>{
    presetInfos[presetRecord.id] = presetRecord;
    return of('success')
  }

  GetCurrentPresetRecord():Observable<PresetRecord>{    
    console.log(presetInfos)
    return of(presetInfos[presetInfos.length-1])
  }

  GetPresetAppointmentsByUserIdList(userIds:any[]):Observable<Appointment[]>{
    return of([]);
  }

  GetPresetAppointments(teacherId, userId):Observable<Appointment[]>{
    return of([]);
  }

  GetPresetAppointmentsFromAppointment(appointmentId):Observable<Appointment[]>{
    let ret_dat:Appointment[] = appointmentsOfOneUser.filter((aptm:Appointment)=>{
      return aptm.type == AppointmentType.PRESET
    })
    return of(ret_dat);
  }

  CloseCurrentPreset(presetId:number):Observable<any>{
    presetInfos[presetId].status = PresetStatus.Closed;
    return of('success');
  }

  UpdateEventById(appointment:Appointment):Observable<any>{
    
    let find = appointmentsOfOneUser.find((apintm:Appointment)=>{
      return apintm.id == appointment.id
    })
    if(find){
      Object.assign(find,appointment);
    }
    return of(find);
  }

  CreateEvent(appointment:Appointment):Observable<any>{    
    if(appointment.type == AppointmentType.PRESET)
      appointment.color = COLOR.Preset;
    else
    {
      let colorList=[];
      for (let col in COLOR){
        console.log(col)
        if(COLOR[col]!=COLOR.Preset)
          colorList.push(COLOR[col]);
      }
      appointment.color =  colorList[Math.floor(Math.random() * colorList.length)];
    }
    appointment.id = appointmentsOfOneUser.length;
    appointmentsOfOneUser.push(appointment);

    return of('success');
  }
}
