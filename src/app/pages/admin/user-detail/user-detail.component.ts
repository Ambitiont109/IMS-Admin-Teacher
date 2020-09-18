import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { UsersService } from "../../../@core/services/users.service";
import { User } from "../../../@core/models/user";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isInvalidControl } from "../../../@core/utils/form.util";
import { MustMatch } from "../../../@core/utils/validators.util";
import { generateRandomPassword } from "../../../@core/utils/password.util";
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId: number;
  user:User;
  profileForm: FormGroup;
  passwordForm:FormGroup;  
  genereatedPwd:string;
  constructor(private route:ActivatedRoute,private fb: FormBuilder, private userService:UsersService, private toastrService:NbToastrService) { }

  ngOnInit(): void {
    this.genereatedPwd = generateRandomPassword(12);
    console.log(this.genereatedPwd)
    
    this.profileForm = this.fb.group({
      first_name:['', Validators.required],
      last_name:['', Validators.required],
      email:['', [Validators.email, Validators.required]],
      username:['',Validators.required],
      picture:['']
    });
    
    this.passwordForm = this.fb.group({
      pwd:['', Validators.required],
      confirm_pwd:['']
    },{ validators:[MustMatch('pwd', 'confirm_pwd')] });

    this.route.paramMap.pipe(switchMap(
      params => {
        this.userId = Number(params.get('id'));
        return this.userService.getUserById(this.userId);
      }
    )).subscribe((user:User) => {
      this.user = user;
      console.log(this.user);
      this.profileForm.reset(user);
    })
  }  

  onProfileSubmit(){
    this.profileForm.markAllAsTouched();
    if(this.profileForm.valid){
      alert(this.profileForm.value);
    }
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
  changeListener(event):void {
    console.log(event);
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.profileForm.get('picture').setValue(event.target.result);
        
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  get picture():string { return this.profileForm.get('picture').value}
  isInvalidControl = isInvalidControl;
}
