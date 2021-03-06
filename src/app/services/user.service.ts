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
  // ======================= getById Method ==========================================
  getUser(id:string){
    return this.DB.doc('user/'+id).snapshotChanges();
  }
 // ======================= add new user Methods ==========================================
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
    this.DB.doc('user/'+id).set(userdata);
  }
  // ======================= Update user Method ==========================================
  updateuser(newuser:User){
    return this.DB.doc('user/'+newuser.id).update(newuser)
   
  }
  // ======================= delete movie Method ==========================================
  deleteuser(newuser:User){
    return this.DB.doc('user/'+newuser.id).delete();
  }
  // ======================= other Method ==========================================
  ifExistUser(id:string){
    return this.DB.doc('user/'+id).get()
  }
  ifExistEmail(email:string){
    return this.DB.collection('user').ref.where("email", "==", email).get();
  }
  
}
