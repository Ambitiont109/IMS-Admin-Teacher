import { Component, OnInit, Inject  } from '@angular/core';
import { NgxFileUploadStorage, NgxFileUploadFactory, NgxFileUploadOptions, NgxFileUploadRequest } from "@ngx-file-upload/core";
import { Router, ActivatedRoute, } from '@angular/router';

@Component({
  selector: 'ngx-picture-add',
  templateUrl: './picture-add.component.html',
  styleUrls: ['./picture-add.component.scss']
})
export class PictureAddComponent implements OnInit {

  public uploads: NgxFileUploadRequest[] = [];

  public storage: NgxFileUploadStorage;

  private uploadOptions: NgxFileUploadOptions;

  constructor( @Inject(NgxFileUploadFactory) private uploadFactory: NgxFileUploadFactory, private router:Router, private route:ActivatedRoute) {
    this.storage = new NgxFileUploadStorage({
      concurrentUploads: 2,
      autoStart: false,
      removeCompleted: 1000 // remove completed after 5 seconds
    });
    this.uploadOptions = {url: "http://localhost:3000/upload"};
  }

  ngOnInit(): void {
    this.storage.change()
    .subscribe(uploads => {
      this.uploads = uploads
      this.uploads.forEach(upload=>{        
      })
    });
  }
  

  public onSelect(event) {
    console.log("Select", event)
    const addedFiles: File[] = event.addedFiles;
    const uploads = this.uploadFactory.createUploadRequest(addedFiles, this.uploadOptions);
    uploads.forEach(upload=>{
      upload.change.subscribe(requestData=>{
        console.log(requestData.response.errors);
      })
    })
    this.storage.add(uploads);
  }

  public onRemove(upload: NgxFileUploadRequest) {
    this.storage.remove(upload);
  }
  back(){
    this.router.navigate(['..'],{relativeTo:this.route})
  }
  public startUploads() {
    this.storage.startAll();
  }
}
