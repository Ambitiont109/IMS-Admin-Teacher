import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Child } from '../../../../@core/models/child';
import { ChildService } from '../../../../@core/services/child.service';
import { MustMatch } from '../../../../@core/utils/validators.util';
import { generateRandomPassword } from "../../../../@core/utils/password.util";
import { isInvalidControl } from '../../../../@core/utils/form.util';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-set-child-pwd',
  templateUrl: './set-child-pwd.component.html',
  styleUrls: ['./set-child-pwd.component.scss']
})
export class SetChildPWDComponent implements OnInit {
  form:FormGroup;
  passwordForm:FormGroup;
  genereatedPwd:string;

  childId:number;
  child:Child;
  constructor(
    private fb:FormBuilder,
    private childService:ChildService,
    private route:ActivatedRoute,
    private router:Router,
    private location:Location,
    private toastrService:NbToastrService
    ) { 
      this.form = this.fb.group({
        username:['',Validators.required],        
      });

      this.passwordForm = this.fb.group({
        pwd:['', Validators.required],
        confirm_pwd:['']
      },{ validators:[MustMatch('pwd', 'confirm_pwd')] });
    }

  ngOnInit(): void {
    this.genereatedPwd = generateRandomPassword(12);

    this.route.paramMap.pipe(switchMap(
      params => {
        this.childId = Number(params.get('childId'));
        return this.childService.getChildById(this.childId);
      }
    )).subscribe((child:Child) => {
      this.child = child;
      this.form.reset(child.parent);

    })
  }
  onFormSubmit(){

  }
  onPasswordSubmit(){
    this.passwordForm.markAllAsTouched();
    if(this.passwordForm.valid){
      alert(this.passwordForm.value);
    }
  }
  setPassword(elem){
    elem.select()
    elem.setSelectionRange(0, 99999);
    document.execCommand("copy");
    this.passwordForm.get('pwd').setValue(this.genereatedPwd);
    this.passwordForm.get('confirm_pwd').setValue(this.genereatedPwd);
    this.toastrService.show(this.genereatedPwd, 'Password Copied');
  }
  back(){
    this.location.back();
  }
  isInvalidControl = isInvalidControl;
}
