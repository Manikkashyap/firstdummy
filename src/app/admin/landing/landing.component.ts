import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor( public userservice:UserService , private router:Router) { }

  id:any;
  userdata:any;
  userinfo:any;
  data:any;

  ngOnInit(): void {

    this.userservice.getall().subscribe((res:any)=>{
      // console.log(res)
      this.userdata=res;
      // console.warn(this.userdata)
      // console.warn(JSON.stringify(res));
      this.userinfo=this.userdata;
      // console.log(this.userinfo.data)
      // console.log(this.userinfo.data.name);
      this.userinfo.data.map((data:any)=>{
      // console.log(data.name)
      })
      });

  }

  // Delete data from the database by admin

  deleteData(_id:string){
    // console.warn(_id);
    this.userservice.delete(_id).subscribe((res)=>{
      // console.warn(res);
    this.router.navigateByUrl('/admin/adminhome')
    });
  }

}
