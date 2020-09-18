import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppointmentService } from "../../../../@core/services/appointment.service";
import { UsersService } from "../../../../@core/services/users.service";
import { User, USERROLE } from "../../../../@core/models/user";
import { isInvalidControl } from "../../../../@core/utils/form.util";
import { Appointment, AppointmentType } from "../../../../@core/models/appointment";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MustAfter } from "../../../../@core/utils/validators.util";
import * as moment from "moment";
import { switchMap } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss']
})
export class AppointmentEditComponent implements OnInit {
  @Input('editmode') isEditmode:boolean;
  userId:number;
  appointmentId:number;
  user:User;
  appoinment:Appointment;

  appointmentForm:FormGroup
  parents:User[];
  teachers:User[];
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private toastrService:NbToastrService,
    private appointmentService:AppointmentService,
    private userService:UsersService,
    private fb: FormBuilder
  ) { 
    this.isEditmode = true;    
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users:User[])=>{
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
    this.appointmentForm = this.fb.group({
      title:['',Validators.required],
      teacher:['', [Validators.required]],
      parent:['', Validators.required],
      start:[moment().toDate(),Validators.required],
      end:[moment().toDate(),Validators.required]
    },{validators:[MustAfter('start','end')]})

    if(this.isEditmode){
      this.route.paramMap.pipe(
        switchMap(
          params => {
            this.appointmentId = Number(params.get('appointment_id'));
            this.userId = Number(params.get('id'));
            return this.appointmentService.getEventById(this.appointmentId);
          }
        )
      ).subscribe((res:Appointment)=>{
        this.appoinment = res;
        this.InitForm(res);
      })  
    }
  }
  InitForm(appointment:Appointment){
    console.log(appointment);
    this.appointmentForm.reset(appointment);

  }
  onSubmit(){
    this.appointmentForm.markAllAsTouched();
    if(this.appointmentForm.valid){
      if(this.isEditmode){
        Object.assign(this.appoinment, this.appointmentForm.value);
        this.appointmentService.UpdateEventById(this.appoinment).subscribe(()=>{})
        this.toastrService.success('Updated the Appointment Info',"Success");
      }else{
        this.appoinment = Object.assign({}, this.appointmentForm.value);
        this.appoinment.type = AppointmentType.FREE;
        this.appointmentService.CreateEvent(this.appoinment).subscribe(_ => {
          this.toastrService.success('Registered the New Appointment',"Success");
          this.router.navigate([`/appointment/${this.appoinment.parent.id}`]);
        })
      }
    }
  }
  back(){
    if(this.userId)
      this.router.navigate([`/appointment/${this.userId}`]);
    else
      this.router.navigate(['/appointment']);
  }
  isInvalidControl = isInvalidControl;
}
