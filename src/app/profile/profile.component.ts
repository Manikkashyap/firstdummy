import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import {MatDialog} from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  BACKEND_URL:any;

  router: any;

  constructor( public userservice:UserService ,public dialog: MatDialog,  private sanitizer: DomSanitizer) { }

  id:any;
  userdata:any;
  userinfo:any;
  displayuserdata:any;
  displayuserinfo:any;
  thumbnail:any;
  enviorment:any=environment.BACKEND_URL;
  localUrl:any;
  imagedata:any=[];
  proimage:any=[];
  proimage1:any=[];
  imagelength!:any;
  result : any[] = [];
  imageform:any;



  ngOnInit(): void {



    this.id=this.userservice.getuserId(); // here we get the id in this.id which we were store in the localstorage at the time of login
    // console.log(this.id);

    this.userservice.display(this.id).subscribe((res)=>{
    console.log(res)
    this.userdata=res;
    // console.warn(this.userdata)
    // console.warn(JSON.stringify(res));
    this.userinfo=this.userdata;
    console.warn(this.userinfo.data.name);
    // this.userinfo.map((data:any)=>{
    //   console.warn(this.userinfo.data.name);
    // })
    });

    this.userservice.displayuploadimage(this.id).subscribe((res)=>{
      // console.log(res);
      // console.warn('test1');
      this.displayuserdata=res;
      this.displayuserinfo=this.displayuserdata;
      // let objectURL = environment.BACKEND_URL+this.displayuserinfo.data[0].imagepath;

      // this.thumbnail = objectURL;

      // console.warn(this.displayuserinfo.data);
     console.warn(this.displayuserinfo.data[0].imagepath);
      // this.displayuserinfo.data.map((data:any)=>{
      //   console.warn(data.imagepath);
      //   console.log(environment.BACKEND_URL)
      //   })

    })




// display user image



this.userservice.displayuploadimage(this.id).subscribe((res)=>{

  this.imagedata=res;
  this.proimage=this.imagedata.data;
  this.imagelength=this.proimage.length;
  this.proimage1=this.proimage[this.imagelength-1]
  // console.warn(this.proimage1);

this.result.push(this.proimage1);   //convert proto from object to array
console.log(this.result);
console.log(this.proimage1);

},(err)=>{
    console.log(err);

  }
  )

// this.userservice.displayuploadimage(this.id).subscribe((res)=>{

//   this.imagedata=res;
//  this.proimage=this.imagedata.data;
//  this.imagelength=this.proimage.length;
// this.proimage1=this.proimage[this.imagelength-1]

// // this.result.push(this.proimage1);   //convert proto from object to array
// // console.log(this.result);
// console.log(this.proimage1);

//   }
//   ,(err)=>{
//     console.log(err);

//   }
//   )

  } //ng onit closing tag


  // submit image data through form

showPreviewImage(event: any) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
        this.localUrl = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
const datafile=event.target.files[0];
console.log(datafile);
this.imageform.patchValue({
image:datafile
});

}
}


















  deleteData(){
    this.id=this.userservice.getuserId(); // here we get the id in this.id which we were store in the localstorage at the time of login
    console.log(this.id);

    this.userservice.delete(this.id).subscribe((res)=>{
      // console.log(res)
      this.userdata=res;
      // console.warn(this.userdata)
      // console.warn(JSON.stringify(res));
      // this.userinfo=this.userdata;
      // console.log(this.userinfo.data.name)
      });
  }

  updateData(f:NgForm){
    // console.log(f.value);
    this.userservice.update(f.value,this.id).subscribe((res)=>{
      // console.log(res);
      alert('Update successfully');
    },(err)=>{
      // console.log(err);
      alert(err.error.data);
    })
  }



}


