import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { takeWhile } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { User, USERROLE } from "../../../@core/models/user";
import { UsersService } from "../../../@core/services/users.service";
import { CellAvatarComponent } from "./cell-avatar/cell-avatar.component";
@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
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
  searchWord:string;


  constructor(private userService: UsersService) {
    this.teacher_src = new LocalDataSource();
    this.parent_src = new LocalDataSource();
  }
  
  ngOnInit(): void {
    this.userService.getTeachers().subscribe((teachers:User[])=>{
      this.teachers = teachers;
      this.teacher_src.load(this.teachers);
    })

    // this.userService.getAllUsers().subscribe((users:User[])=>{
    //   users.forEach((user:User)=>{
    //     if(user.role == USERROLE.Parent){
    //       this.parents.push(user)
    //     }
    //     if(user.role == USERROLE.Teacher){
    //       this.teachers.push(user)
    //     }
    //   })
    //   this.teacher_src.load(this.teachers);
    //   this.parent_src.load(this.parents);
    // })
    
  }
  onSearchWordChange(newWord:string){
    this.searchWord = newWord;
    if(this.searchWord){

      this.teacher_src.setFilter([{field:'first_name',search:this.searchWord}, {field:'last_name', search:this.searchWord}], false);    
    }else{
      this.teacher_src.setFilter(null);
    }    
  }
  ngOnDestroy() {    
  }

}
