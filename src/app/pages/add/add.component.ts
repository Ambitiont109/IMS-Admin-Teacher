import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from "../../student.service";
import { Student } from "../../student";
import { CONSTANTS } from "../../constants";
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
  NbStepperComponent,
} from '@nebular/theme';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  @ViewChild("stepper") stepper:NbStepperComponent;
  @Input() student:Student;
  @Output('onUpdateDone') onUpdateEvent = new EventEmitter();
  contactInfoForm: FormGroup;
  highSchoolInfoForm: FormGroup;
  collegeInfoForm: FormGroup;
  militaryInfoForm: FormGroup;
  employmentInfoForm: FormGroup;
  isEditMode: boolean;

  years: Array<string>;
  typeListOfHighSchool: Array<string>;
  valueListOfIsGrudated: Array<any>;
  valueListOfReceivedAid: Array<string>;
  valueListOfLocaion:Array<any>;

  typeListOfCollege: Array<any>;
  valueListOfScholarship: Array<any>;
  valueListOfDegree: Array<any>;

  valueListOfBranchMilitary: Array<any>;
  constructor(private fb: FormBuilder, private studentService:StudentService, private toastrService: NbToastrService) {    
    this.constructForm();
  }
  constructForm(){
    this.years = CONSTANTS.years;
    this.typeListOfHighSchool=CONSTANTS.typeListOfHighSchool;
    this.valueListOfIsGrudated = CONSTANTS.valueListOfIsGrudated;
    this.valueListOfReceivedAid = CONSTANTS.valueListOfReceivedAid;
    this.valueListOfLocaion = CONSTANTS.valueListOfLocaion;
    this.typeListOfCollege = CONSTANTS.typeListOfCollege;
    this.valueListOfScholarship = CONSTANTS.valueListOfScholarship;
    this.valueListOfDegree = CONSTANTS.valueListOfDegree;
    this.valueListOfBranchMilitary = CONSTANTS.valueListOfBranchMilitary;

    this.contactInfoForm = this.fb.group({
      name:['', Validators.required],
      email:['', Validators.email],
      phonenumber:['',Validators.nullValidator],
      mailAddress:['',Validators.nullValidator],
      isContracted:['no', Validators.nullValidator],
      reason:['', Validators.nullValidator],
      staffName:['',Validators.required],
      isEngaged:['no', Validators.nullValidator],
      isgrduateWJA:['yes', Validators.nullValidator],
      graduateWJA:['2011', Validators.nullValidator],
      sponsorName:['', Validators.nullValidator]
    });
    this.highSchoolInfoForm = this.fb.group({
      isAttendHighSchool:['unknown',Validators.nullValidator],
      typeOfHighSchool:['unknown', Validators.nullValidator],
      isReceivedAid:['unknown', Validators.nullValidator],
      isGraduated:['unknown', Validators.nullValidator],
      name:['',Validators.nullValidator],
      location:['unknown', Validators.nullValidator]
    })
    this.collegeInfoForm = this.fb.group({
      isAttendCollege:['unknown', Validators.nullValidator],
      typeOfCollege:['unknown', Validators.nullValidator],
      isReceivedScholarship:['unknown', Validators.nullValidator],
      isGraduatedCollege:['unknown', Validators.nullValidator],
      fieldOfStudy: ['', Validators.nullValidator],
      nameOfCollege: ['', Validators.nullValidator],
      location:['unknown', Validators.nullValidator]
    })

    this.militaryInfoForm = this.fb.group({
      isEnlistMilitary:['unknown', Validators.nullValidator],
      branchOfMilitary:['unknown', Validators.nullValidator]
    })

    this.employmentInfoForm = this.fb.group({
      isEmployed:['unknown', Validators.nullValidator],
      nameOfCompany:['', Validators.nullValidator],
      jobTitle:['', Validators.nullValidator]
    })
  }
  initFromStudent(student: Student){
    this.contactInfoForm.reset(student);
    this.highSchoolInfoForm.reset(student);
    this.collegeInfoForm.reset(student);
    this.militaryInfoForm.reset(student);
    this.employmentInfoForm.reset(student);
    this.collegeInfoForm.get('location').setValue(this.student.locationOfCollege);
    this.highSchoolInfoForm.get('location').setValue(this.student.highschool_location);
  }
  ngOnInit() {
    if(this.student){
      this.isEditMode = true;
      this.initFromStudent(this.student);
    }else{
      this.isEditMode = false;
    }
  }
  isInvalid(form:FormGroup, field_name:string): boolean {
    let control = form.get(field_name);
    return control.invalid && (control.dirty || control.touched)
  }
  get name() { return this.contactInfoForm.get('name'); }
  get isContracted(){ return this.contactInfoForm.get('isContracted'); }
  get isgrduateWJA() { return this.contactInfoForm.get('isgrduateWJA'); }

  onContactInfoSubmit() {
    this.contactInfoForm.markAllAsTouched();
    console.log(this.contactInfoForm)
  }

  onHighSchoolInfoSubmit() {
    this.highSchoolInfoForm.markAllAsTouched();
    console.log(this.highSchoolInfoForm)
  }

  onCollegeInfoSubmit(){
    this.collegeInfoForm.markAllAsTouched();
    console.log(this.collegeInfoForm);
  }

  onMilitaryInfoSubmit(){
    this.militaryInfoForm.markAllAsTouched();
    console.log(this.collegeInfoForm);
  }

  onEmploymentInfoSubmit(){
    this.employmentInfoForm.markAllAsTouched();
    console.log(this.employmentInfoForm);
  }

  SaveStudent(){
    let student = new Student();
    console.log(this.contactInfoForm.value);
    student = Object.assign(student,this.contactInfoForm.value);
    student = Object.assign(student, this.highSchoolInfoForm.value);
    student = Object.assign(student, this.collegeInfoForm.value);
    student = Object.assign(student, this.militaryInfoForm.value);
    student = Object.assign(student,this.employmentInfoForm.value);
    student.name = this.contactInfoForm.value.name;
    student.highschool_name = this.highSchoolInfoForm.value.name;
    student.highschool_location = this.highSchoolInfoForm.value.location;
    student.locationOfCollege = this.collegeInfoForm.value.location;

    if(this.isEditMode){
      student.id = this.student.id;
      this.studentService.UpdateStudent(student).subscribe( res => {
        this.onUpdateEvent.emit(student);
        this.showToast("primary","Congratulations","A new Student has been updated");
      })
    }else{
      this.studentService.AddStudent(student).subscribe(resp=>{
        this.showToast("primary","Congratulations","A new Student has been added");
        this.stepper.reset();
      })
    }
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 3000,
      hasIcon: true,
      position:  NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    const titleContent = title ? `${title}` : '';

    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
}

