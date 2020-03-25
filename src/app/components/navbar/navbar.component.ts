import { UpdateprofileComponent } from './../updateprofile/updateprofile.component';
import { UserService } from './../../services/user.service';
import { User } from './../../interfaces/user';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isopen:boolean = false;
  isUser:boolean = false;
  MyUser:User={};
  constructor(private authser:AuthenticationService,private router:Router
    ,private userser:UserService,private dialoginj:MatDialog) { 
    this.authser.user.subscribe(u =>{
      if(u) {
        this.isUser = true;
        this.userser.getUser(u.uid).subscribe(myuser => {
          this.authser.MyUser.id = u.uid;
          this.authser.MyUser.firstname = myuser.payload.data()['firstname']
          this.authser.MyUser.lastname = myuser.payload.data()['lastname']
          this.authser.MyUser.type = myuser.payload.data()['type']
          this.authser.MyUser.password = myuser.payload.data()['password']
          this.authser.MyUser.email = myuser.payload.data()['email']
          this.MyUser = this.authser.MyUser;
        })
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
  UpdatePassword(){
    let dialogRef = this.dialoginj.open(UpdateprofileComponent,{
      width: '320px'
    });
  }
  signOut(){
    this.authser.signout();
    this.router.navigate(['']);
  }
}
