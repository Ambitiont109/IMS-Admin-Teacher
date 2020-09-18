import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable, of, BehaviorSubject } from 'rxjs';
import { events, appointmentsOfOneUser,presetInfos, presetApnts } from "../dummy";
import { Appointment, colors, COLOR, AppointmentType, PresetRecord, AppointmentStatus, PresetStatus, PresetAppointment } from "../models/appointment";
import { NameOfClass } from '../models/child';
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
  createBlankPresetAppointment():PresetAppointment{
    return {
      className:undefined,
      presetInfo:undefined,
      child:undefined,
      start:undefined,
      timerange:undefined,
      end:undefined      
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

  GetPresetAppointmentByClassroom(classroom:NameOfClass):Observable<PresetAppointment[]>{
    // Return PresetAppointments of classroom of current PresetRecord
    return of(presetApnts);
  }
 
  CloseCurrentPreset(presetId:number):Observable<any>{
    presetInfos[presetId].status = PresetStatus.Closed;
    return of('success');
  }
  updatePresetAppointment(apnt:PresetAppointment):Observable<any>{
    return of('');
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

  createPresetAppointment(apnt:PresetAppointment):Observable<any>{
    apnt.id = presetApnts.length;
    presetApnts.push(apnt);
    return of('success');
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
