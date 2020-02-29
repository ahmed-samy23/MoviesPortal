import { UserService } from './user.service';
import { User } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
//https://www.positronx.io/send-verification-email-new-user-firebase-angular/
  MyUser:User={};
  constructor(private Authinject:AngularFireAuth) { }
  // =================================Sign in_up with email&password==================================
  signupWithEP(email:string,password:string){
    return this.Authinject.auth.createUserWithEmailAndPassword(email,password)
  }

  SendVerificationMail(fname:string) {
    this.updateuserprofile(fname);
     return this.Authinject.auth.currentUser.sendEmailVerification()
    .then(result => {
      console.log("============ email send ============");
    }).catch(err=>{
      console.log("============ error email send secc ============");
      console.log(err);
    })
  }
  updateuserprofile(name:string){
    this.Authinject.auth.currentUser.updateProfile({
      displayName : name,
    })
  }
  signInEP(email:string,password:string){
    return this.Authinject.auth.signInWithEmailAndPassword(email,password)
  }
  // =================================Sign in_up with google==================================
  signIn_UpGoogle(){
    var provider = new auth.GoogleAuthProvider();
    return this.Authinject.auth.signInWithPopup(provider)
  }
  // ===================================================================
  signout(){
    this.Authinject.auth.signOut()
      console.log('SignOut: ')
  }
}
