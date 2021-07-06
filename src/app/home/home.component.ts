import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { FileUploader  } from 'ng2-file-upload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor( public userservice:UserService) { }

  id:any=this.userservice.getuserId();

  backendurl='http://localhost:3000/imageupload/'+this.id;

  public uploader:FileUploader = new FileUploader({url:this.backendurl,itemAlias:'image'});

  data:any;
  userdata:any;
  userinfo:any;

  ngOnInit(): void {

    console.warn(this.id);
    this.uploader.onAfterAddingFile = (file)=>{file.withCredentials=false};
    this.uploader.onCompleteItem = (item:any,res:any,status:any,header:any)=>{
    console.log(res,status,header,item);
    this.userdata=res;
    console.warn(this.userdata)
    console.warn(JSON.stringify(res));
    this.userinfo=this.userdata;
    console.log(this.userinfo.data._id);
    }

  }



}
