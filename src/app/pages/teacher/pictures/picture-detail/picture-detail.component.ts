import { Component, OnInit } from '@angular/core';
import { User } from "../../../../@core/models/user";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { PictureService } from "../../../../@core/services/picture.service";
import { Lightbox } from 'ngx-lightbox';
import { NbUser } from '@nebular/auth';
import { Picture, ChildPicture } from '../../../../@core/models/picture';
import { Child } from '../../../../@core/models/child';
@Component({
  selector: 'ngx-picture-detail',
  templateUrl: './picture-detail.component.html',
  styleUrls: ['./picture-detail.component.scss']
})
export class PictureDetailComponent implements OnInit {
  childId:number;
  child:Child;
  pictures:Picture[];
  _album:any[];
  constructor(private route:ActivatedRoute,
              private router:Router,
              private _lightbox: Lightbox,
              private pictureService:PictureService) { }

  ngOnInit(): void {
    
    this.route.paramMap.pipe(switchMap(
      params => {
        this.childId = Number(params.get('childId'));
        return this.pictureService.getPicturesOfChild(this.childId);
      }
    )).subscribe((data:ChildPicture) => {
      console.log(data);
      this.pictures = data.pictures; 
      this.child = data.child;
      this._album=[]
      this.pictures.forEach(item=>{        
        this._album.push({src:item.url});
      })     
    })
  }
  add(){
    this.router.navigate([`teacher/pictures/add/${this.childId}`]);
  }
  open(index:number){
    this._lightbox.open(this._album,index, {
      centerVertically: true,
      fitImageInViewPort: false
    });
  }
  back(){
    this.router.navigate(['/teacher/pictures']);
  }
}
