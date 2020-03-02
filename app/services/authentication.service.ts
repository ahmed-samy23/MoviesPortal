import { User } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  MyUser:User={};
  user:Observable<firebase.User>;
  
  constructor(private Authinject:AngularFireAuth) { 
    this.user = this.Authinject.user;
  }

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
  // =================================Sign in_up with Facebook==================================
  signIn_UpFacebook(){
    var provider = new auth.FacebookAuthProvider();
    return this.Authinject.auth.signInWithPopup(provider)
  }
  // ===================================================================
  signout(){
    this.Authinject.auth.signOut()
      console.log('SignOut: ')
  }
}
