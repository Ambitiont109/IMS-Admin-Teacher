import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { User, USERROLE } from '../../../@core/models/user';
import { CellAvatarComponent } from "../parent-list/cell-avatar/cell-avatar.component";
import { UsersService } from '../../../@core/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ngx-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  parents: User[] = [];
  teachers: User[] = [];
  teacher_src: LocalDataSource;
  parent_src: LocalDataSource;
  
  settings = {
    actions:{
      add:false,
      edit:false,
      delete:false,
      position:'right'
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    hideSubHeader:true,
    hideHeader:true,
    pager:{
      perPage:4
    },
    columns: {
      picture:{
        type: 'custom',
        renderComponent: CellAvatarComponent,
      }      
    },
  };
  

  constructor(private userService: UsersService, private router:Router,private route:ActivatedRoute) {
    this.teacher_src = new LocalDataSource();
    this.parent_src = new LocalDataSource();
  }
  
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users:User[])=>{
      users.forEach((user:User)=>{
        if(user.role == USERROLE.Parent){
          this.parents.push(user)
        }
        if(user.role == USERROLE.Teacher){
          this.teachers.push(user)
        }
      })
      this.teacher_src.load(this.teachers);
      this.parent_src.load(this.parents);
    })    
  }

  onRowSelect(event){
    let selected_user:User = event.data;
    this.router.navigate([selected_user.id],{relativeTo:this.route});
  }

}
