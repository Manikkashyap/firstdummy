import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public userservice:UserService, private router:Router) { }

  ngOnInit(): void {
  }
//blank array
userdata:any=[];


logindata(f:NgForm)
{
  this.userservice.login(f.value).subscribe((res)=>{
  console.log(res);
  this.userdata=res;
  console.log(this.userdata.user.name)
  console.log(this.userdata.token);
  console.log(this.userdata.user._id);
  this.userservice.setToken(this.userdata.token);
  this.userservice.setuserId(this.userdata.user._id);
  console.log(this.userdata.user.role)
  alert('login Successfull')
  if(this.userdata.user.role == 'admin'){
    this.router.navigateByUrl('/admin/adminhome')
  }
  else{
    this.router.navigateByUrl('/home')
  }
},(err)=>{
    console.log(err);
    alert(err.error.message)
  })


}

}
