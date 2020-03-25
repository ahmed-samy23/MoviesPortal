import { UserService } from './../../services/user.service';
import { MatDialog } from '@angular/material';
import { User } from './../../interfaces/user';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {
  erromassege:string=''
  userObservable:Subscription;
  MyUser:User={};
  isClicked:boolean = false;
  constructor(private authser:AuthenticationService,private dialoginj:MatDialog,private userser:UserService) { 
    this.userObservable = this.authser.user.subscribe(u =>{
      if(u) {
        this.MyUser = this.authser.MyUser;
      }
    })
  }

  ngOnInit() {
  }
  async updateprofile(form:NgForm){
    this.isClicked = true;
    let valuesOfForm = form.value
    let MycurrentUser:firebase.User = await this.authser.reauthenticate(this.MyUser)
    if(MycurrentUser){
      MycurrentUser.updatePassword(valuesOfForm.newpassword).then(() => {
        this.MyUser.password = valuesOfForm.newpassword;
        this.userser.updateuser(this.MyUser)
        .then(()=> {
          form.reset();
          this.isClicked = false;
          this.dialoginj.closeAll();
          window.alert('Your password updated successfully');
        })
        .catch((err)=>{
          this.isClicked = false;
          window.alert('Can`t update password: '+err.message);
        })
      }).catch((error) => { 
        this.isClicked = false;
        window.alert('Can`t update password: '+error.message); 
      });
    }else{
      this.isClicked = false;
      window.alert('Can`t update password');
    }
  }

  onNoClick(){
    this.dialoginj.closeAll();
  }
}
