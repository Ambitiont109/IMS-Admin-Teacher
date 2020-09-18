import { Component, OnInit } from '@angular/core';
import { Child, NameOfClass } from '../../../@core/models/child';
import { ChildService } from '../../../@core/services/child.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenComponent implements OnInit {
  children:Child[];
  currentClassName:NameOfClass; 
  constructor(
    private childService:ChildService,
    private router:Router,
    private route:ActivatedRoute
    ) {
  }

  ngOnInit(): void {
    
    this.currentClassName = this.childService.getCurrentClassName();
    this.childService.getChildrenByClassName(this.currentClassName).subscribe(data=>{
      this.children = data;
    })
  }
  onSelect(selectedChild:Child){
    this.router.navigate([selectedChild.id-1],{relativeTo:this.route})
  }
  
}
