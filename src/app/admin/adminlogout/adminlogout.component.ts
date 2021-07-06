import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-adminlogout',
  templateUrl: './adminlogout.component.html',
  styleUrls: ['./adminlogout.component.css']
})
export class AdminlogoutComponent implements OnInit {

  constructor(public userservice:UserService , private router:Router) { }

  ngOnInit(): void {
    alert('Wanna Logout ?');
    this.userservice.deleteToken();
    this.userservice.deleteuserId();
    this.router.navigateByUrl('/login');
  }

}
