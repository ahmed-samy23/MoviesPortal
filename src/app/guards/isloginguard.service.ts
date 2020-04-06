import { AuthenticationService } from './../services/authentication.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsloginguardService implements CanActivate {

  constructor(private authser:AuthenticationService,private Router:Router) { }

  canActivate(Route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean
  | Observable<boolean> |Promise<boolean>{
    return new Promise ( resolve =>{
      this.authser.user.subscribe(user => {
        if(user){
          resolve(false)
          this.Router.navigate([''])
          window.alert('You already sign in before')
        }else{
          resolve(true)
        }
      })
    })
  }
}
