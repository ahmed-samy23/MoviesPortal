import { AuthenticationService } from './authentication.service';
import { User } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private DB:AngularFirestore, private authser:AuthenticationService) { 

  }

  addnewuser_EP(id:string ,userdata:User){
    userdata.type = 2;
    let newuser: User={
      firstname : userdata.firstname,
      lastname : userdata.lastname,
      email : userdata.email,
      password : userdata.password,
      type : userdata.type
    }
    this.DB.doc('user/'+id).set(newuser);
    this.authser.SendVerificationMail(userdata.firstname);
  }

  addnewuser_googlePro(id:string ,userdata:User){
    console.log('============ user services')
    console.log(userdata)
    this.DB.doc('user/'+id).set(userdata);
  }

  getUser(id:string){
    return this.DB.doc('user/'+id).snapshotChanges();
  }

  ifExistUser(id:string){
    return this.DB.doc('user/'+id).get()
  }
  
}
