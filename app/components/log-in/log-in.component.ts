import { User } from './../../interfaces/user';
import { UserService } from './../../services/user.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private router:Router,private authser:AuthenticationService,private userser:UserService
    ,private ngZone: NgZone) { }

  ngOnInit() {
  }
  clickedEP:boolean = false;
  loginWithEP(form:NgForm){
    this.clickedEP = true;
    let data = form.value
    this.authser.signInEP(data.email,data.password)
    .then((result) => {
      this.userser.getUser(result.user.uid).subscribe(myuser =>{
        this.authser.MyUser.id = result.user.uid;
        this.authser.MyUser.firstname = myuser.payload.data()['firstname'];
        this.authser.MyUser.lastname = myuser.payload.data()['lastname'];
        this.authser.MyUser.password = myuser.payload.data()['password'];
        this.authser.MyUser.type = myuser.payload.data()['type'];
        this.authser.MyUser.email = myuser.payload.data()['email'];
      })
      if (result.user.emailVerified !== true) {
        this.authser.SendVerificationMail(this.authser.MyUser.firstname)
          .then(()=> {
            window.alert('Please validate your email address. Kindly check your inbox.')
            this.clickedEP = false;
            this.router.navigate([''])
            }
          );
      } else {
        this.ngZone.run(() => {
          this.clickedEP = false;
          this.router.navigate(['']);
        });
      }
    })
    .catch(err => {// he is not a user
      this.clickedEP = false;
      console.log('ERR catsh: ',err)
      window.alert(err.message);
    })
  }

  clickedgoogle:boolean = false;
  login_signUpwithGoogle(){
    this.clickedgoogle = true;
    this.authser.signIn_UpGoogle() // sign in with google in authication feature
    .then(result=>{
        this.clickedgoogle = false;
        this.userser.ifExistUser(result.user.uid).subscribe(docSnapshot => { // if user exists in database login directlly
          if (docSnapshot.exists) {
            this.userser.getUser(result.user.uid).subscribe(myuser =>{
              let name:string[] = result.user.displayName.split(' ')
              this.authser.MyUser.firstname = name[0];
              this.authser.MyUser.lastname = name[1];
              this.authser.MyUser.email = result.user.email;
              this.authser.MyUser.type = 2;
              this.authser.MyUser.id =result.user.uid;
              this.router.navigate(['']);
              })
          }else{ // if user not exists in database, add data before login
            let name:string[] = result.user.displayName.split(' ')
            let newuser:User={
              firstname : name[0],
              lastname : name[1],
              email : result.user.email,
              type : 2
            }
            this.userser.addnewuser_googlePro(result.user.uid,newuser)
            window.alert('Thanks for joining us, Now you can login with your google acount')
            this.router.navigate(['']);
                }
            })
    })
    .catch(err=>{
      this.clickedgoogle = false;
      window.alert(err.message);
    })
  }

  clickedFace:boolean = false;
  login_signUpwithFacebook(){
    this.clickedFace = true;
    this.authser.signIn_UpFacebook() // sign in with google in authication feature
    .then(result=>{
        this.clickedFace = false;
        this.userser.ifExistUser(result.user.uid).subscribe(docSnapshot => { // if user exists in database login directlly
          if (docSnapshot.exists) {
            this.userser.getUser(result.user.uid).subscribe(myuser =>{
              let name:string[] = result.user.displayName.split(' ')
              this.authser.MyUser.firstname = name[0];
              this.authser.MyUser.lastname = name[1];
              this.authser.MyUser.email = result.user.email;
              this.authser.MyUser.type = 2;
              this.authser.MyUser.id =result.user.uid;
              this.router.navigate(['/home']);
              })
          }else{ // if user not exists in database, add data before login
            let name:string[] = result.user.displayName.split(' ')
            let newuser:User={
              firstname : name[0],
              lastname : name[1],
              email : result.user.email,
              type : 2
            }
            this.userser.addnewuser_googlePro(result.user.uid,newuser)
            window.alert('Thanks for joining us, Now you can login with your facbook acount')
            this.router.navigate(['/home']);
                }
            })
    })
    .catch(err=>{
      this.clickedFace = false;
      window.alert(err.message);
    })
  }
}
