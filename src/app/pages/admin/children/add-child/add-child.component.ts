import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ChildService } from '../../../../@core/services/child.service';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { AtleastOneValidator } from '../../../../@core/utils/validators.util';
import { NameOfClass } from '../../../../@core/models/child';
import { isInvalidControl } from "../../../../@core/utils/form.util";
import { ToastService } from '../../../../@core/services/toast.service';

@Component({
  selector: 'ngx-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.scss']
})
export class AddChildComponent implements OnInit {
  childForm:FormGroup;
  classNameList:NameOfClass[];
  constructor(private location:Location,
    private childService:ChildService,
    private toastService:ToastService,
    private fb:FormBuilder
    ) {
      this.classNameList = this.childService.classNameList;
      this.childForm = this.fb.group({
        photo:[undefined],
        photoFile:[undefined],
        first_name: ['', Validators.required],
        last_name:  ['', Validators.required],
        birth:['', Validators.required],
        gender:['male', Validators.required],
        nationality:['',Validators.required],
        address:['',Validators.required],
        nameOfClass:[NameOfClass.Baobab, Validators.required],
        firstNameOfMother:['',Validators.required],
        lastNameOfMother:['',Validators.required],
        phoneOfMother:['', Validators.required],
        emailOfMother:['',[Validators.email,Validators.required]],
        phoneOfFather:['', Validators.required],
        emailOfFather:['',[Validators.email,Validators.required]],
        emergencyContacts:this.fb.array(
          [1,2,3,4].map(i=>{return this.NewEmergencyContact()}), 
          AtleastOneValidator
        ),
        authPersons:this.fb.array([1,2,3,4].map(i=>{
                                          return this.NewAuthPersonContact()
                                        }),
                                    AtleastOneValidator
        ),
        allgeries:['',Validators.nullValidator],
        food_restriction:['',Validators.nullValidator],
        health_issue:['',Validators.nullValidator],
        isAccept:[false, Validators.requiredTrue]
      });
  }

  ngOnInit(): void {
  }
  onSubmit(){
    this.childForm.markAllAsTouched();
    if(this.childForm.valid){
      this.childService.addNewChild(this.childForm.value).subscribe(_=>{
        this.toastService.success('New Child has been added succesfully','success');
      })
    }
  }
  
  get emergencyContacts():FormArray{return this.childForm.get('emergencyContacts') as FormArray};
  get authPersons():FormArray{return this.childForm.get('authPersons') as FormArray};
  get name():string {return this.childForm.get('first_name').value + ' ' + this.childForm.get('last_name').value}
  NewEmergencyContact():AbstractControl{
    return this.fb.group({
      name:['',Validators.nullValidator],
      email:['',[Validators.email,Validators.nullValidator]],
      phone_number:['',Validators.nullValidator]
    });
  }
  NewAuthPersonContact():AbstractControl {
    return this.fb.group({
      first_name:['',Validators.nullValidator],
      last_name:['',Validators.nullValidator],
      photo:['Upload', Validators.nullValidator],
      photoSource:['', Validators.nullValidator],
      phone_number:['', Validators.nullValidator]
    })
  }
  changeListener(event):void {
    console.log(event);
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.childForm.get('photo').setValue(event.target.result);        
      }
      this.childForm.get('photoFile').setValue(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  back(){
    this.location.back();
  }
  get photo():string{
    return this.childForm.get('photo').value? this.childForm.get('photo').value : '';
  }
  isInvalidControl=isInvalidControl;
}
