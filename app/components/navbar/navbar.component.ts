import { User } from './../../interfaces/user';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isopen:boolean = false;
  isUser:boolean = false;
  MyUser:User={};
  constructor(private authser:AuthenticationService,private router:Router) { 
    this.authser.user.subscribe(u =>{
      if(u) {
        this.isUser = true;
        this.MyUser = this.authser.MyUser;
      }
      else this.isUser =false
      })
      console.log('isuser',this.isUser)
  }

  ngOnInit() {
  }
  togglenavbar(){
    this.isopen = !this.isopen
  }
  signOut(){
    this.authser.signout();
    this.router.navigate(['']);
  }
}
