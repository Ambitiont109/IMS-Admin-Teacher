import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../auth.service";
import { UsersService } from '../../@core/services/users.service';
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  rememberMe = false;

  constructor(protected service: AuthService,protected router: Router, private userService:UsersService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.errors = [];
    this.messages = [];    
    let user = this.user;
    this.submitted=true;
    if(user.email == 'test@teacher.com'){
      this.userService.setDummyCurrentUser('teacher')
      localStorage.setItem('access_token', 'test token')
      this.router.navigate(['/dashboard']);
      
    }
    if(user.email == 'test@admin.com'){
      this.userService.setDummyCurrentUser('admin')
      localStorage.setItem('access_token', 'test token')
      this.router.navigate(['/dashboard']);
    }
    return;
    this.service.login(user.email,user.password).subscribe((res:any) => {
      console.log(res);
      localStorage.setItem('access_token', res.token)
      this.router.navigate(['/dashboard']);
      this.submitted=true;
    },
    (error:any)=>{
      console.log(error);
      console.log("====================")
      this.submitted=false;
      this.errors=['login failed']
      this.showMessages['error']=true
    }
    );
  }
}
