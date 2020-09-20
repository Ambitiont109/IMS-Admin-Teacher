import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChildService } from '../../../../@core/services/child.service';
import { switchMap } from 'rxjs/operators';
import { Child } from '../../../../@core/models/child';
import { NbDialogService } from '@nebular/theme';
import { YesNoDialogComponent } from '../../../../components/yes-no-dialog/yes-no-dialog.component';

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
    private childService:ChildService,
    private dialogService:NbDialogService
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
  onSiblingClick(sibling:Child){
    this.router.navigate([`../${sibling.id}`],{relativeTo:this.route});
  }
  onRemoveSiblingClick(){
    this.dialogService.open(YesNoDialogComponent,{context:{
      title:'This child will be removed from sibling. Are you going to continue?'
    }}).onClose.subscribe(ret=>{
      if(ret==true)
        this.childService.RemoveChildFromSibling(this.child).subscribe(_=>{

        })
    })
  }
  onAddSiblingClick(){
    this.router.navigate(['addsiblings'],{relativeTo:this.route});
  }
  onSetPWDClick(){
    this.router.navigate(['setpwd'],{relativeTo:this.route});
  }
  
  back(){
    this.router.navigate(['/children']);
  }

}
