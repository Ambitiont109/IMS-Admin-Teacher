import { Component, OnInit } from '@angular/core';
import { User } from "../../../@core/models/user";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { PictureService } from "../../../@core/services/picture.service";
import { Lightbox } from 'ngx-lightbox';
import { NbUser } from '@nebular/auth';
import { UsersService } from '../../../@core/services/users.service';
@Component({
  selector: 'ngx-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit {
  parents:User[] = [];
  constructor(private route:ActivatedRoute,
              private router:Router,
              private userService:UsersService
             ) { }

  ngOnInit(): void {
    this.userService.getParents().subscribe((users:User[])=>{
      this.parents = users;
      console.log(this.parents);
    })
  }
  onSelect(selectedUser:User){
    this.router.navigate([`detail/${selectedUser.id}`],{relativeTo:this.route});
  }
}
