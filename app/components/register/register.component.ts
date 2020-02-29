import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { AuthenticationService } from './../../services/authentication.service';
import { User } from './../../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  erromassege:string ='';
  constructor(private authser:AuthenticationService, private userser:UserService,private router:Router) { 
  }
  
  ngOnInit() {
  }
  
  signupWithEP(form: NgForm){
    let userdata : User = form.value
    this.authser.signupWithEP(userdata.email,userdata.password)
    .then(result => {
      this.erromassege = '';
      this.userser.addnewuser_EP(result.user.uid,userdata);
      window.alert('Thanks for joining us, Now you can login and verificate your email')
      this.router.navigate(['']);
    })
    .catch(error => {
      this.erromassege = error.message;
    })
  }
  
  clicked:boolean = false;
  login_signUpwithGoogle(){
    this.clicked = true;
    this.authser.signIn_UpGoogle() // sign in with google in authication feature
    .then(result=>{
        this.clicked = false;
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
            window.alert('Thanks for joining us, Now you can login with your google acount')
            this.router.navigate(['/home']);
                }
            })
    })
    .catch(err=>{
      this.clicked = false;
      window.alert(err.message);
    })
  }

}
