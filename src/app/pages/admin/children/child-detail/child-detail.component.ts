import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChildService } from '../../../../@core/services/child.service';
import { switchMap } from 'rxjs/operators';
import { Child } from '../../../../@core/models/child';

@Component({
  selector: 'ngx-child-detail',
  templateUrl: './child-detail.component.html',
  styleUrls: ['./child-detail.component.scss']
})
export class ChildDetailComponent implements OnInit {
  childId:number;
  child:Child;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private childService:ChildService
  ) { 
    this.route.paramMap.pipe(switchMap(
      params => {
        this.childId = Number(params.get('childId'));
        return this.childService.getChildById(this.childId);
      }
    )).subscribe((child:Child) => {
      this.child = child;
    })
  }

  ngOnInit(): void {

  }

  back(){
    this.router.navigate(['/children']);
  }

}
