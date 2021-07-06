import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor( public userservice:UserService, private router:Router) { }

  ngOnInit(): void {
    alert('Wanna Logout ?');
    this.userservice.deleteToken();
    this.userservice.deleteuserId();
    this.router.navigateByUrl('/');
  }

}
