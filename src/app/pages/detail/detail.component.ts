import { Component, OnInit, Input,EventEmitter, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { YesNoDialogComponent } from '../../components/yes-no-dialog/yes-no-dialog.component';

import { Student } from "../../student";
import { StudentService } from "../../student.service";
@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() student:Student;
  @Output() onBack = new EventEmitter();
  isEdit:boolean = false;
  constructor( private dialogService: NbDialogService,
               private studentService: StudentService
    ) { }

  ngOnInit(): void {
  }

  back(): void {
    if(this.isEdit)
    {
      this.isEdit = false;
    }else{
      console.log("back");
      this.onBack.emit();  
    }
  }

  delete(): void {
    this.dialogService.open(YesNoDialogComponent).onClose.subscribe(ret=>{
      console.log(ret);
      if(ret==true){
        this.studentService.DeleteStudent(this.student).subscribe(res=>{
          console.log("Delete", res);
          this.isEdit = false;
          this.back();
        })
      }
    })
  }

  edit(): void {
    this.isEdit = true;
  }
  onUpdateDone(data:Student): void {
    console.log(data);
    this.student = data;
    this.isEdit = false;
  }
  get contactInfo(){return this.student.getContactInfo()}
  get highSchoolInfo(){return this.student.getHighSchoolInfo();}
  get collegeInfo(){return this.student.getCollegeInfo();}
  get militaryInfo(){return this.student.getMilitaryInfo();}
  get employmentInfo(){return this.student.getEmploymentInfo();}
}
