import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isInvalidControl } from "../../../@core/utils/form.util";
import { User } from "../../../@core/models/user";
import { UsersService } from "../../../@core/services/users.service";
import { MustMatch } from "../../../@core/utils/validators.util";
import { ENETDOWN } from 'constants';
import { generateRandomPassword } from "../../../@core/utils/password.util";
import { NbToastrService, NbPopoverDirective } from '@nebular/theme';
import { DIR_DOCUMENT } from '@angular/cdk/bidi';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm:FormGroup;
  user:User;
  genereatedPwd:string;
  constructor(private fb: FormBuilder, private userService:UsersService, private toastrService:NbToastrService) { }

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
      current_pwd:['', Validators.required],
      pwd:['', Validators.required],
      confirm_pwd:['']
    },{ validators:[MustMatch('pwd', 'confirm_pwd')] });
    
    this.userService.getCurrentUser().subscribe((user:User)=>{
      this.user = user;
      this.profileForm.reset(this.user);
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
  // isInvalidControl(form:FormGroup, field_name:string){
  //   console.log(form);
  //   let res = invalid(form,field_name);
  //   console.log(res);
  //   return res;
  // }
}
