import { AuthenticationService } from './../services/authentication.service';
import { Observable, Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsadminguardService implements CanActivate, OnDestroy {
  subscription:Subscription
  constructor(private authser:AuthenticationService,private Router:Router) { }

  canActivate(Route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean
  | Observable<boolean> |Promise<boolean>{
    return new Promise ( resolve =>{
      this.subscription = this.authser.user.subscribe(user => {
        if(user && this.authser.MyUser.type === 1){
          resolve(true)
          this.subscription.unsubscribe()
        }else{
          this.subscription.unsubscribe()
          resolve(false)
          this.Router.navigate([''])
          window.alert('Sorry, You do not have permission to access this page!!')
        }
      })
    })
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
