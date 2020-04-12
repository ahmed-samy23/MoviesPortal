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
  isdelete:boolean = false;
  isUser:boolean = false;
  MyUser:User={};
  constructor(private authser:AuthenticationService,private router:Router
    ,private userser:UserService,private dialoginj:MatDialog) { 
    this.authser.user.subscribe(async (u) =>{
      if(u) {
        this.isUser = true;
        await this.userser.getUser(u.uid).subscribe(myuser => {
          if(myuser.payload.data()){
            this.authser.MyUser.id = u.uid;
            this.authser.MyUser.firstname = myuser.payload.data()['firstname']
            this.authser.MyUser.lastname = myuser.payload.data()['lastname']
            this.authser.MyUser.type = myuser.payload.data()['type']
            this.authser.MyUser.password = myuser.payload.data()['password']
            this.authser.MyUser.email = myuser.payload.data()['email']
            this.MyUser = this.authser.MyUser;
          }else {
            this.authser.signout(); // to when delete account and re load navebar
            this.isUser =false
          }
        })
      }
      else {
        this.isUser =false
      }
      })
  }

  ngOnInit() {
  }
  togglenavbar(){
    this.isopen = !this.isopen
  }
  toggleDeleteRow(){
    this.isdelete = !this.isdelete
  }
  UpdatePassword(){
    let dialogRef = this.dialoginj.open(UpdateprofileComponent,{
      width: '320px'
    });
  }
  async DeleteMyAccount(){
    let MycurrentUser:firebase.User = await this.authser.reauthenticate(this.MyUser)
    if(MycurrentUser){
      let deletedUser:User = this.MyUser;
      MycurrentUser.delete()
      .then(()=>{
        this.userser.deleteuser(deletedUser)
        .then(()=> console.log('user deleted from cloud firestore'))
        .catch((err)=>{
          console.log('err in deleteuser',err)
        })
      })
      .catch((err)=>{
        console.log('err in delete',err)
      })
    }else{
      console.log('err in reauthenticate: MycurrentUser: ');
      console.log(MycurrentUser);
    }
  }
  signOut(){
    this.authser.signout();
    this.router.navigate(['']);
  }
}
